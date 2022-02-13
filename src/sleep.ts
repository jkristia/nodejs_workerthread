export class Sleep {
    public static async ms(ms: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        })
    }
}
