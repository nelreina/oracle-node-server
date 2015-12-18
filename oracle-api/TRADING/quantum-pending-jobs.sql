SELECT /*+rule*/
       (DECODE(prh.payrun_ind, 'P', 'Payment', 'R', 'Receipt', 'I', 'Internal settlement', 'Unknown')) "title"
,      (DECODE(prh.payrec_status,'E','error','pendig'))                                                "status"
,      (INITCAP(com.company_abbr))                                                                     "companyAbbr"
,      (INITCAP(bm.bank_abbr))                                                                         "bankAbbr"
,      (prf.bank_account_nr)                                                                           "bankAccountNr"
,      ((cm.currency_abbr))                                                                            "currencyAbbr"
,      (INITCAP(clm.client_abbr))                                                                      "clientAbbr"
,      (prh.payrec_transfer_nr)                                                                        "payrecTransferNr"
,      (prf.qt_deal_no)                                                                                "qtDealNo"
,      (prh.doc_registration_nr)                                                                       "docRegistrationNr"
,      (NVL(ih.invoice_nr, pp.invoice_nr))                                                             "invoiceNr"
,      (trading.pck_currency.sf_get_format(prh.currency_nr,'A'))                                       "cFormat"
,      (INITCAP(btm.booking_type_abbr))                                                                "bookingTypeAbbr"
,      (prh.company_nr)                                                                                "companyNr"
,      (prh.creation_date)                                                                             "creationDate"
,      (prh.date_update)                                                                               "lastModified"
,      (prh.login_id)                                                                                  "userModified"
FROM   payrec_transfer      prf
,      client_master        clm
,      currency_master      cm
,      bank_master          bm
,      payrec_req_header    prh
,      company_master_ro    com
,      invoice_header_ro    ih
,      prepayment_ro        pp
,      booking_type_master  btm
WHERE  prf.qt_deal_no            IS NULL
AND    clm.client_nr             = prh.client_nr
AND    cm.currency_nr            = prh.currency_nr 
AND    bm.bank_nr                = prh.bank_nr 
AND    prh.payrec_transfer_nr    = prf.payrec_transfer_nr
AND    prh.payrec_status         = 'R'
AND    prh.company_nr            = com.company_nr
AND    prh.payrun_ind            IN ('P', 'R', 'I')
AND    prh.doc_registration_nr   = ih.doc_registration_nr   (+)
AND    prh.prepayment_nr         = pp.prepayment_nr         (+)
AND    prh.booking_type_nr       = btm.booking_type_nr
       -- trading.pck_quantum_interface.sp_create_cflow_xml(r_pt.payrec_transfer_nr);