echo "[*] Upgrading the system"
sudo apt-get update
sudo apt-get dist-upgrade -y
sudo apt-get install -y apt-transport-https git make dirmngr

echo "[*] Cloning multi_protocol_gateway software"
cd /usr/share
sudo git clone https://github.com/bogdanoniga/multi_protocol_gateway.git
cd /usr/share/multi_protocol_gateway

echo "[*] Installing Nodejs & npm"
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs nginx sqlite3

echo "[*] Installing multi_protocol_gateway "
sudo chmod -R 777 /usr/share/multi_protocol_gateway && cd /usr/share/multi_protocol_gateway
npm install

echo "[*] Setting nginx config"
sudo cp ./configs/nginx.conf /etc/nginx/sites-enabled/default
sudo service nginx restart

echo "[*] Setting multi_protocol_gateway systemctl service"
sudo mv ./configs/multi_protocol_gateway.service /etc/systemd/system/ && sudo chmod 664 /etc/systemd/system/multi_protocol_gateway.service
sudo mv ./configs/multi_protocol_gateway.sh /usr/local/bin && sudo chmod 744 /usr/local/bin/multi_protocol_gateway.sh

echo "[*] Reloading systemctl"
sudo systemctl daemon-reload

echo "[*] Start Multi protocol gateway"
sudo service multi_protocol_gateway start
