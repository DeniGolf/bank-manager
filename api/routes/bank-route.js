const { Router } = require("express")

const router = new Router();

const BankService = require('../../services/bank.service')

router.post('/', BankService.createBank)
router.get('/', BankService.getBanks)
router.get('/:id', BankService.getBank)
router.put('/:id', BankService.updateBank)
router.delete('/:id', BankService.deleteBank)

module.exports = router;