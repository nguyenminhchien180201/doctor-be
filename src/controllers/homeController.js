// import { Json } from 'sequelize/types/lib/utils';

import db from '../models/index';
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }

}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server')
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('editCRUD', {
            user: userData
        });
    }
    else {
        return res.send('no id')
    }

}
let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    let getAllUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: getAllUsers
    });

}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('delete succeed');
    } else {
        return res.send('user not found');
    }


}
// một Object phải có key và value
module.exports = {
    getAboutPage: getAboutPage,
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}