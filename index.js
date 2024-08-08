/* 
 *IMPORTANT NOTE:
 * -use the link below to register
 * https://faucetearner.org/?r=806297036669
 */

const axios = require("axios");
const express = require('express');

const timeout = 20000;
//Login Credentials
const user = process.env.USER;
const pass = process.env.PASS;

let app = express()

app.get('/', async(req, res) => {
	res.send(`<center>This API is made by HackMeSenpai with ❤</center>`)
});

app.listen(3000, () => {
	console.log(`Server is listening at port 3000`);
	setInterval(async() => {
	    let res = await axios.post('https:/\/faucetearner.org/api.php', {
	        'email': user,
	        'password': pass
        }, {
	        params: {
	            'act': 'login'
	        }
        });
        cookie = res.headers['set-cookie'];
        cookie = cookie.map(el=>el.split(';')[0]+';');
        let res2 = await axios.get('https:/\/faucetearner.org/faucet.php', {
	        headers: {
		        'cookie': 'googtrans=/en/en;'+cookie[0]+cookie[1]
	        }
        });
        cookie.push(res2.headers['set-cookie'][0].split(';')[0]+';');
    /*
    *	THIS PART IS FOR CHECKING IF FAUCET IS READY TO BE CLAIMED
    */
    /*let res3 = await axios.post('https:/\/faucetearner.org/api.php', {}, {
	    params: {
		    'act': 'get_faucet'
	    },
	    headers: {
		    'cookie': 'googtrans=/en/en;'+cookie[0]+cookie[1]+cookie[2],
	    }
    });*/
        let res3 = await axios.post('https:/\/faucetearner.org/api.php', {}, {
	        params: {
		        'act': 'faucet'
	        },
	        headers: {
		        'cookie': 'googtrans=/en/en;'+cookie[0]+cookie[1]+cookie[2],
	        }
        });
        console.log(res3.data);
    }, timeout);
});
