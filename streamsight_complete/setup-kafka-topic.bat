@echo off
:: Run this ONCE after Kafka is up to create the required topic
set KAFKA_HOME=C:\kafka
echo Creating Kafka topic: clickstream-events...
%KAFKA_HOME%\bin\windows\kafka-topics.bat --create --topic clickstream-events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
echo.
echo Verifying topic...
%KAFKA_HOME%\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
echo.
echo Done! Topic is ready.
pause
