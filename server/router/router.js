import { Router } from "express";
import { addMedicines } from "../controllers/addMedicinesController.js";
import { getMedicines } from "../controllers/getMedicines.js";
import { addSurgicalEquipment } from "../controllers/addSurgicalEquipment.js";
import { getSurgicalEquipment } from "../controllers/getSurgicalEquipmentControler.js";
const router = Router();

//POST METHODS
router.route('/addMedicines').post(addMedicines);
router.route('/addSurgicalEquipment').post(addSurgicalEquipment);

//GET METHODS
router.route('/getMedicines').get(getMedicines);
router.route('/getSurgicalEquipment').get(getSurgicalEquipment);



//PUT METHODS

//DELETE METHODS

export default router;