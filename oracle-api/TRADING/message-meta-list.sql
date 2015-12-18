SELECT msg.*
,  sq.named_output
,  CASE sq.output_type_ind
        WHEN 'P' THEN 
             UPPER(sq.named_output)
        WHEN 'E' THEN 
             em.email
   END                                                         "userDestination" 
,  CASE sq.output_type_ind
        WHEN 'P' THEN 
             'PR'
        WHEN 'E' THEN 
             'EM'
   END                                                         "userDestinationType" 
,  dtr.transaction_nr                                          "transactionNr"
, (SELECT MIN(dd.document_nr) 
   FROM document_doc dd 
   WHERE dd.doc_registration_nr = msg."mainDocRegistrationNr") "documentNr"
,  tm.contract_reference                                       "contractReference"
FROM (
SELECT REGEXP_SUBSTR(r.aggregator_id, '[0-9]*') "mainDocRegistrationNr"
,      r.userid_requestor                       "userIdRequester"
,      r.msg_description                        "msgDescription"
,      user_site.site_abbr                      "userSite"
,      COUNT(DISTINCT r.aggregator_id)          "countDocuments"
,      min(r.process_status)                    "processStatus"
,      min(r.datetime_requested)                "datetimeRequested"
,      MAX(r.date_update)                       "datetimeCompleted"

FROM   esb_message_meta r
,      Site_Master user_site

WHERE  r.site_nr          = user_site.site_nr
AND    r.esb_message_type = NVL(:message_type, r.esb_message_type)
AND    r.site_nr          = NVL(:site_nr, r.site_nr)
AND    r.userid_requestor = NVL(:user_id, r.userid_requestor)
AND    r.process_status   = NVL(:process_status, r.process_status)
AND    (
       (  :main_doc_registration_nr IS NOT NULL AND      REGEXP_SUBSTR(r.aggregator_id, '[0-9]*') = NVL(:main_doc_registration_nr, REGEXP_SUBSTR(r.aggregator_id, '[0-9]*'))
       )
OR    (  :main_doc_registration_nr IS NULL AND    r.datetime_requested > sysdate  -   NVL(:dttime, 1440) /1441
       )
       )
GROUP BY REGEXP_SUBSTR(r.aggregator_id, '[0-9]*')
,        r.userid_requestor
,        r.msg_description
,        user_site.site_abbr
) msg
, doc_trans_ref    dtr
, trans_master     tm
, employee_master  em
, employee_site    es
, site_queue       sq
WHERE msg."mainDocRegistrationNr" = dtr.doc_registration_nr(+)
AND   tm.transaction_nr(+)        = dtr.transaction_nr
AND   msg."userIdRequester"       = em.user_id
AND   em.user_nr                  = es.user_nr
AND   es.site_queue_nr            = sq.site_queue_nr
ORDER BY "datetimeRequested" desc