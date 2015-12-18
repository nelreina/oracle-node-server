SELECT login_id     "loginId"
       ,date_update "dateUpdate"
       ,rec_status  "recStatus"
       ,destination "destination"
       ,action      "action"
       ,response    "response"
       ,message     "message"
       ,KEY         "key"
FROM   trading.quantum_log 
WHERE  date_update > trunc(SYSDATE) 
ORDER  BY date_update DESC