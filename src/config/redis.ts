import { createHandyClient } from 'handy-redis';
export default class Redis {
    private redisClient : any;

    /**
     * Metodo deve ser chamado antes de iniciar uma operação com o Redis
     * @param options 
     * https://www.npmjs.com/package/redis#rediscreateclient configurações que podem ser passadas para a função que inicializa a conexão com redis; 
     * Caso queira utilizar alguma porta diferente, caso não, pode invocar o metodo que o construtor vai usar os valores default do redis;
     */
    public async initialize(options?: any) {
        try {
            this.redisClient = createHandyClient(options);
        } catch (error) {
            throw error;
        }
        
    }

    /**
     * Responsável por armezar os valores no redis
     * @param key 
     * @param value 
     */
    private async set(key:string , value: string){
        try {
            return await this.redisClient.set(key,value);
        } catch (error) {
            throw error;
        }
        
    }

    /**
     * Responsavel por recuperar os valores do redis;
     * @param key 
     */
    private async get(key: string){
        try {
            return await this.redisClient.get(key);
        } catch (error) {
            throw error;
        }
        
    }
}