const fpsExternalIdentity = process.env.FPS_EXTERNAL_IDENTITY
const socialSecurityNumber = process.env.SOCIAL_SECURITY_NUMBER
function getTimeSlot(locationId) {
  return fetch('https://fp.trafikverket.se/boka/occasion-bundles', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8,gl;q=0.7',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json',
      'Cookie': `ASP.NET_SessionId=u1opkpjuxuz31yqvomf3nbfh; _pk_id.4.825a=9734d80114a08968.1718529179.; FpsPartnerDeviceIdentifier=A40551CCADB73F215783FF3D414F1C2E53E8E89F7A2A927CC3B6C565B6C9E4E15515D0625272DB07792037006797F8C20906025D79D303A25D311D5C7E3448C1027690956F4A9BEB6CEB8C6D5DC02F9650DD5CDB71B5FC50C3C0B325504CAE0D7D2B4013B9C369DE944D00EEE72DFE00AC200C53AE75E4B085224BE5FBA52C82B00B5268E44A65314892E94ACC2A10A4C5699B7EC1789D4B5335863BCF1868FD; _pk_ref.4.825a=%5B%22%22%2C%22%22%2C1718642723%2C%22https%3A%2F%2Fbransch.trafikverket.se%2F%22%5D; _pk_ses.4.825a=1; NSC_mc-gpsbsqspw-fyu-xfc-iuuq-wt=ffffffff0914196145525d5f4f58455e445a4a423660; LoginValid=2024-06-17 19:32; FpsExternalIdentity=${fpsExternalIdentity}`,
      'Origin': 'https://fp.trafikverket.se',
      'Pragma': 'no-cache',
      'Referer': 'https://fp.trafikverket.se/boka/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"'
    },
    body: JSON.stringify({
      bookingSession: {
        socialSecurityNumber,
        licenceId: 5,
        bookingModeId: 0,
        ignoreDebt: false,
        ignoreBookingHindrance: false,
        examinationTypeId: 0,
        excludeExaminationCategories: [],
        rescheduleTypeId: 0,
        paymentIsActive: false,
        paymentReference: null,
        paymentUrl: null,
        searchedMonths: 0
      },
      occasionBundleQuery: {
        startDate: '1970-01-01T00:00:00.000Z',
        searchedMonths: 0,
        locationId,
        nearbyLocationIds: [],
        languageId: 0,
        vehicleTypeId: 2,
        tachographTypeId: 1,
        occasionChoiceId: 1,
        examinationTypeId: 12
      }
    })
  }).then(r => {
    if (r.status !== 200) {
      console.log(r.status)
      throw new Error('API returned a wrong status code')
    }
    return r.json()
  }).then((data) => {
    if (data.status !== 200) {
      console.log(data)
      throw new Error('API returned a wrong status code')
    }
    return data
  })
}

module.exports = {
  getTimeSlot
}
