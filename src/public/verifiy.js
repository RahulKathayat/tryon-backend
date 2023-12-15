document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('token');
  console.log('token', idParam);

  document.getElementById('redirectButton').addEventListener('click', function () {
    window.location.href = 'https://www.korakagaj.com';
  });

  function showLoader() {
    document.getElementById('loader').style.display = 'block';
  }

  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }

  function myFunction() {
    showLoader();

    // const apiUrl = `http://localhost:5000/v1/auth/verify-email?token=${idParam}`;
    const apiUrl = `https://api.korakagaj.com/v1/auth/verify-email?token=${idParam}`;
    const other_params = {
      headers: { 'content-type': 'application/json; charset=UTF-8' },
      method: 'POST',
      mode: 'cors'
    };

    fetch(apiUrl, other_params)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Could not reach the API: ' + response.statusText);
        }
      })
      .then(function (data) {
        hideLoader();
        // document.getElementById("result").innerHTML = JSON.stringify(data);
        document.getElementById('result').innerHTML = `<p>Account Verified Successfully</p>`;
      })
      .catch(function (error) {
        hideLoader();
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
      });
  }

  myFunction();
});
