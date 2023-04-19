import { Router } from "express";
import { addMedicines } from "../controllers/addMedicinesController.js";
import { getMedicines } from "../controllers/getMedicines.js";
import { addSurgicalEquipment } from "../controllers/addSurgicalEquipment.js";
import { getSurgicalEquipment } from "../controllers/getSurgicalEquipmentControler.js";
import { editMedicines } from "../controllers/editMedicinesControler.js";
import { editSurgicalEquipment } from "../controllers/editSurgicalEquipmentController.js";
import { deleteMedicines } from "../controllers/deleteMedicineControler.js";
import { deleteSurgicalEquipment } from "../controllers/deleteSurgicalEquipmentController.js";
import { getLabEquipments } from "../controllers/getLabEquipmentsController.js";
import { addLabEquipment } from "../controllers/addLabEquipmentsController.js";
import { deleteLabEquipment } from "../controllers/deleteLabEquipmentController.js";
import { editLabEquipment } from "../controllers/editLabEqipmentController.js";
import { addMedicalDevice } from "../controllers/addMedicalDeviceController.js";
import { getMedicalDevice } from "../controllers/getMedicalDeviceController.js";
import { editMedicalDevice } from "../controllers/editMedicalDeviceController.js";
import { deleteMedicalDevice } from "../controllers/deleteMedicalDeviceController.js";
const router = Router();

//POST METHODS
router.route('/addMedicines').post(addMedicines);
router.route('/addSurgicalEquipment').post(addSurgicalEquipment);
router.route('/addLabEquipment').post(addLabEquipment);
router.route('/addMedicalDevice').post(addMedicalDevice);

//GET METHODS
router.route('/getMedicines').get(getMedicines);
router.route('/getSurgicalEquipment').get(getSurgicalEquipment);
router.route('/getLabEquipment').get(getLabEquipments);
router.route('/getMedicalDevice').get(getMedicalDevice);

//PUT METHODS
router.route('/editMedicines').put(editMedicines);
router.route('/editSurgicalEquipment').put(editSurgicalEquipment);
router.route('/editLabEquipment').put(editLabEquipment);
router.route('/editMedicalDevice').put(editMedicalDevice);

//DELETE METHODS
router.route('/deleteMedicines').delete(deleteMedicines);
router.route('/deleteSurgicalEquipment').delete(deleteSurgicalEquipment);
router.route('/deleteLabEquipment').delete(deleteLabEquipment);
router.route('/deleteMedicalDevice').delete(deleteMedicalDevice);

export default router;