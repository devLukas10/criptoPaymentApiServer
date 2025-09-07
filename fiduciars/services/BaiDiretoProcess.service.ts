import { TextProcessInfoTypes } from "../types/TextProcessInfoTypes";


export class BaiDiretoProcessService {

    private async nahoraTextProcess (message: string,): Promise<TextProcessInfoTypes> {
        let senderName = /A pedido de (.*?) foi/i;
        let operationType = /transferência NaHora/i;
        let reference = /dados: Descrição:\s*(.*?)\s*Valor/i;
        let amountRegex = /Valor:\s*(\w+)\s*([0-9.,]+)/i;
        let bankName = /\.(\s*[A-Z][A-Z\s,\.]+)/i;

        if (!operationType.test(message)) throw Error("METHODS NOT FOUND");

        let amount = message.match(amountRegex)[2]?.replaceAll(',', '.').slice(0, -1);
        let currency = message.match(amountRegex)[1];
        

        let result: TextProcessInfoTypes = {
            uid: Math.floor(Math.random() * 99999999 * 999).toString(),
            amount: Number(amount),
            reference:  message.match(reference)[1] as string,
            currency: currency as string,
            bankName:  message.match(bankName)[1] as string,
            senderName:  message.match(senderName)[1] as string,
            operationType:  "NaHora",
            status: "Sucess",
            date: Date.now()
        }
        return result;
    }

    async NaHora(): Promise<TextProcessInfoTypes>{
        let message = `A pedido de DANIEL ARTUR SANTOS foi realizada uma transferência NaHora com os dados: Descrição: 845785469  Valor:Kz 10,00. BAI, S.A.`;
        return await  this.nahoraTextProcess(message);
    }
}