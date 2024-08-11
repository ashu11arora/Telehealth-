//imports

const  express=require('express');
const connection=require("./Config/server");
const DoctorRouter = require('./Routes/Doctor.route');
const PatientRouter = require('./Routes/Patient.route');
const AppointmentRouter = require('./Routes/Appointment.route');
const AdminRouter = require('./Routes/Admin.route');
const crypto = require('crypto');
const axios = require('axios');

require("dotenv").config()
const app=express();
const cors=require('cors')
app.use(cors(
    {
        origin: 'https://ashudeploy-mern.vercel.app', // Allow only your frontend domain
  methods: ["POST","GET"]// Specify allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    }

    
))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.get("/",(req,res)=>{    
    res.send("Doctors Appoinment Backend")
})






app.use("/doctor",DoctorRouter)
app.use("/patient",PatientRouter)
app.use("/appointment",AppointmentRouter)
app.use("/admin", AdminRouter)


let salt_key = '96434309-7796-489d-8924-ab56988a6076'
let merchant_id = 'PGTESTPAYUAT86'
app.post('/order', async (req, res) => {

    try {

        let merchantTransactionId = req.body.transactionId

        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:8080/status?id=${merchantTransactionId}`,
            redirectMode: "POST",
            mobileNumber: req.body.phone,
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        }


        const payload = JSON.stringify(data)
        const payloadMain = Buffer.from(payload).toString('base64')
        const keyIndex = 1
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;


        // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        }

        await axios(options).then(function (response) {

            console.log(response.data)
            return res.json(response.data)

        }).catch(function (error) {
            console.log(error)
        })




    } catch (error) {
        console.log(error)
    }


})


app.post('/status', async (req, res) => {

    const merchantTransactionId = req.query.id
    const merchantId = merchant_id


    const keyIndex = 1
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;


    const options = {
        method: 'GET',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }


    }


    axios.request(options).then(function (response) {
        if (response.data.success === true) {
            const url = 'http://localhost:3000/success'
            return res.redirect(url)
        } else {
            const url = 'http://localhost:3000/fail'
            return res.redirect(url)
        }

    }).catch(function (error) {
        console.log(error)
    })


})






app.listen(process.env.PORT||3001,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log("unable to connect to database")
    }
    console.log("server is running on port 8080")
})
