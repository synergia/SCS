Uruchomienie
---
* Uruchomić Raspberry Pi 3 i połączyć się z hotspotem **Pi3-AP**
* Wejść do systemu przez SSH	`ssh pi@172.24.1.1`
*  Uruchomić [pigpiod](http://abyz.co.uk/rpi/pigpio/python.html) daemon na porcie 3000  `sudo pigpiod -p 3000`
* Dalej uruchomić serwer w folderze SCS: `sudo python server.py`
* W przeglądarce wpisać adres **172.24.1.1:5000**

Sterowanie
---
Klawisze **A**, **Z** odpowiadają za wypełnienie PWM. Domyślnie wartości są 0.
Klawisze **↓** **→** **←**  **↑** za odpowiednie kierunki poruszania się.



TODO
---

* Zakres pobierać z pliku konfiguracyjnego. Domyślnie: 0 - 255
* Wyświetlanie w %
* Ujednolicić JSON
