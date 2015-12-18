SELECT r.log_process                "logProcess"
,     TRUNC(r.log_time, 'HH24')     "logTime"
,      COUNT(*)                     "count"
FROM  esb_log r  
WHERE r.log_time > TRUNC(SYSDATE) - 30
AND   r.log_process like 'glnl.%'
GROUP BY   TRUNC(r.log_time, 'HH24')
,        r.log_process
order by 2 