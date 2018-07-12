echo "[*] Cloning ble_gateway software"
cd /usr/share
sudo git clone https://github.com/bogdanoniga/ble_gateway.git
sudo chmod -R 777 /usr/share/ble_gateway
/usr/share/ble_gateway/setup.sh

echo "[*] Remake nginx conf"
sudo cp ./multi_protocol_gateway/configs/nginx.conf /etc/nginx/sites-enabled/default
sudo service nginx restart
