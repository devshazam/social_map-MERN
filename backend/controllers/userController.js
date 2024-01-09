const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')
const uuid = require('uuid');
const { recordBackendErrorToLog } = require("../error-log/LogHandling");
const { Credentials } = require('aws-sdk/lib/credentials');

const generateJwt = (id, email, role, phone, score ) => {
    return jwt.sign(
        {id, email, role, phone, score},
        process.env.SECRET_KEY,
        {expiresIn: '7d'}
    )
}
class UserController {


    async logReg(req, res, next) {
        let {first_name, last_name, verified_email, bdate, email, photo, phone, role} = req.body
        if(verified_email !== '1') {
            return next(ApiError.internal('Ваш email не подтвержден!'))
        }
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            try{
                    let qObject = {};
                    if(first_name) qObject = {...qObject, name: first_name};
                    if(last_name) qObject = {...qObject, name: qObject.name + " " + last_name};
                    if(bdate) qObject = {...qObject, birthday: bdate};
                    if(email) qObject = {...qObject, email: email};
                    if(photo) qObject = {...qObject, profile_image: photo};
                    if(phone){qObject = {...qObject, phone: phone};}
                    if(role){qObject = {...qObject, role: role};}
                    if(verified_email === '1') qObject = {...qObject, email_status: true};
                const userReg = await User.create({ ...qObject });
            const token = generateJwt(userReg.id, userReg.email, userReg.role, userReg.phone, userReg.score)
            return res.json({token})
        } catch (error) {
            await recordBackendErrorToLog({code: 621, eMessage: error.message});
            return next(ApiError.internal(`621: ${error.message}`));
        }
        }
        
        const token = generateJwt(user.id, user.email, user.role, user.phone, user.score)
        return res.json({token})
    }


    async registration(req, res, next) {
            let {name, email, password, phone, role} = req.body
            role = role || 'USER';

            if (!email || !password) {
                return next(ApiError.internal('Некорректный email или password'))
            }
            const candidate = await User.findOne({where: email}).exec();

            if (candidate) {
                return next(ApiError.internal('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({name, phone, email, role, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.role, user.phone, user.score)
            return res.json({token})
    }


    async login(req, res, next) {
        const {email, password} = req.body
        // console.log(email, password)
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.phone, user.score)
        return res.json({token})
    }


    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.phone, req.user.score)
        return res.json({token})
    }

    
    async fetchUserDataById(req, res, next) {
        try{
            let {userId} = req.body
            let fudbiQ1 = await User.findById(userId)
            .select("name phone email role address score")
            .exec();
            return res.json(fudbiQ1);
        }catch (error) {
            await recordBackendErrorToLog({code: 612, eMessage: error.message});
            return next(ApiError.internal(`612: ${error.message}`));
        }
    }


    async changeCredencials(req, res, next) {
        try{
            let {phone, userId} = req.body
            let ccQ1 = await User.updateOne({ _id: userId }, { phone });
            console.log(ccQ1)
            return res.json({status: 'success'});
        }catch (error) {
            await recordBackendErrorToLog({code: 612, eMessage: error.message});
            return next(ApiError.internal(`612: ${error.message}`));
        }
    }
    
    
    // POST(_4_): `api/user/` + `/change`
    // async change(req, res, next) {
        //     const {email, phone} = req.body
    //
    //     try{await User.update({email, phone}, {where: {id : req.user.id}});
    //             try{
    //                 const user = await User.findOne({where: {id: req.user.id}})
    //             const token = generateJwt(user.id, user.email, user.role, user.phone, user.score)
    //             return res.json({token})
    //             }catch(e){
    //                 await recordBackendErrorToLog({code: 622, eMessage: error.message});
    //                 return next(
    //                     ApiError.badRequest(
    //                         `618: ${e.message}`
    //                     )
    //                 );
    //             }
    //     }catch(e){
    //         await recordBackendErrorToLog({code: 622, eMessage: error.message});
    //         return next(
    //             ApiError.badRequest(
    //                 `619: ${e.message}`
    //             )
    //         );
    //     }
    // }
    


// // Подтверждение почты при регистрации
//     async confirmMail(req, res, next) {
//         const {email} = req.body

//     // Отправка кода подтверждения на email клиента
//         // console.log(fileName)
//         const headers = {
//           'Content-Type':'application/json',
//           'Accept':'application/json',
//           'X-API-KEY': process.env.UNISENDER_API_KEY
//         };
        
//         const confirmCode = uuid.v4()
//         const inputBody = {
//           "message": {
//             "recipients": [
//               {
//                 "email": "jack.lee137@outlook.com"
//               }
//             ],
//             "body": {
//               "html": "<p>Уважаемый клиент ваш код подтвержденния поччтового адреса расположен в этой строке:</p><h1>" + confirmCode + "</h1>", // уникальный код подтверждения UUID
//               "plaintext": "Hello, {{to_name}}",
//             },
//             "subject": "Пароль подтверждения почты",
//             "from_email": "one@kopi34.ru",
//             "from_name": "письмо с сайта kopi34.ru"
//           }
//         };
//         fetch('https://go1.unisender.ru/ru/transactional/api/v1/email/send.json',
//         {
//           method: 'POST',
//           body: JSON.stringify(inputBody),
//           headers: headers
//         })
//         .then(function(res) {
//             return res.json();
//         }).then(function(body) {
    //             return res.json({body})
//         });
        
//     }

    async getUsersList(req, res, next) {
        try{
            const gulQ1 = await User.find()
            .limit(10)
            .sort({ ['createdAt']: -1 })
            .exec();
            return res.json(gulQ1);
        }catch (error) {
            await recordBackendErrorToLog({code: 612, eMessage: error.message});
            return next(ApiError.internal(`612: ${error.message}`));
        }
    }
}

module.exports = new UserController()
