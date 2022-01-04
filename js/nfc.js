class NfcManager
{
    constructor(callbackLog) {
        this.callbackLogger = callbackLog;
        if (typeof NDEFReader === 'undefined') {
            this.callbackLogger(`NDEFReader не доступен в данном браузере`);
            return;
        }
        this.ndef = new NDEFReader();
        document.write(`<p>NDEFReader создан</p>`);
    }

    exec() {
        this.ndef.scan().then(() => {
            this.callbackLogger(`Сканирование NFC-адаптера...`);
            this.ndef.onreadingerror = () => {
                this.callbackLogger(`Ошибка чтения NFC-метки`);
            };
            this.ndef.onreading = (event) => {
                this.callbackLogger(`NDEF-сообщение прочитано: ${ JSON.stringify(event.message) }`);
            };
        }).catch(error => {
            this.callbackLogger(`Не удалось начать сканирование: ${error}`);
        });
    }
}
