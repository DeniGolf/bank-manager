const { Router } = require("express")

const router = new Router();

const CalculateService = require('../../services/calculate.service')

router.post('/:id', CalculateService.createCalculateByBankId)
router.get('/:id', CalculateService.getCalculatesByBankId)

module.exports = router;