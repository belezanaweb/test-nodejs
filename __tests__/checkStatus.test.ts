import model from '../src/models/Model'
import { CheckStatusController } from '../src/controllers/CheckStatus.controller'

describe('Check Status Service', () => {
    
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Check Status', () => {

        it('Should not check status because it throws an error', async () => {
            jest.spyOn(model, 'findOne').mockImplementation(() => {
                throw new Error()
            })

            let response = {} as any
            
            await CheckStatusController.get(null, null, (res) => response = res)
   
            expect(response.status).toBe(503)
            expect(response.message).toEqual('Serviço indisponível')
        })

        it('Should check status', async () => {
            jest.spyOn(model, 'findOne').mockResolvedValue(1)

            let response = {} as any
            
            await CheckStatusController.get(null, null, (res) => response = res)

            expect(response.status).toBe(200)
            expect(response.body.message).toEqual('Ok')
        })


    })

})