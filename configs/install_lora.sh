echo "[*] Cloning lora_gateway software"
cd /usr/share
sudo git clone https://github.com/bogdanoniga/lora_gateway.git
sudo chmod -R 777 /usr/share/lora_gateway
/usr/share/lora_gateway/setup.sh

echo "[*] Remake nginx conf"
sudo cp ./multi_protocol_gateway/configs/nginx.conf /etc/nginx/sites-enabled/default
sudo service nginx restart
