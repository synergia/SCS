Uruchomienie
---
* Uruchomić Raspberry Pi 3 i połączyć się z hotspotem **Pi3-AP**
* Wejść do systemu przez SSH	`ssh pi@172.24.1.1`
* Uruchomić server **$ sudo sh run.sh**
* W przeglądarce wpisać adres **172.24.1.1:5000**

Sterowanie
---
Klawisze **↓** **→** **←**  **↑** za odpowiednie kierunki poruszania się.

Backup
---
ssh pi@xx.xx.x.xxx sudo dd if=/dev/mmcblk0 bs=1M | pv | gzip -c > img.gz

Restore
---
gzip -dc SCS-0.11.0-alfa.gz | sudo dd of=/dev/mmcblk0 bs=1M conv=noerror,sync|pv
