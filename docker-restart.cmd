@echo off

docker restart echoplant-backend
echo api server restarted

docker attach echoplant-backend