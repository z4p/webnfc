class NfcManager
{
    constructor(callbackLog, callbackScanned) {
        this.callbackLogger = callbackLog;
        this.callbackScanned = callbackScanned;
        if (typeof NDEFReader === 'undefined') {
            this.callbackLogger(`NDEFReader не доступен в данном браузере`);
            return;
        }
        this.ndef = new NDEFReader();
        this.callbackLogger(`NDEFReader создан`);
    }

    exec() {
        this.ndef.scan().then(() => {
            this.callbackLogger(`Сканирование NFC-адаптера...`);
            this.ndef.onreadingerror = () => {
                this.callbackLogger(`Ошибка чтения NFC-метки`);
                this.callbackScanned();
            };
            this.ndef.onreading = (event) => {
                this.callbackLogger(`NDEF-сообщение прочитано: ${ JSON.stringify(event.message) }`);
                this.callbackScanned();
            };
        }).catch(error => {
            this.callbackLogger(`Не удалось начать сканирование: ${error}`);
        });
    }
}
