document.addEventListener('DOMContentLoaded', function () {
	// Load sidebar navigation
	var el = document.querySelectorAll('.sidenav');
	M.Sidenav.init(el);
	loadNav();

	function loadNav() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status != 200) return;

				// load navigation menu
				document.querySelectorAll('.topnav, .sidenav').forEach(function (el) {
					el.innerHTML = xhttp.responseText;
				});

				// add event listener to navigation
				document.querySelectorAll('.sidenav a, .topnav a').forEach(function (el) {
					el.addEventListener('click', function (event) {
						// close sidenav
						var sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();

						// load selected page
						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open('GET', 'nav.html', true);
		xhttp.send();
	}

	// Load page content
	var page = window.location.hash.substr(1);
	if (page == '') page = 'home';
	loadPage(page);

	function loadPage(page) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				var content = document.querySelector('#body-content');
				// if success
				if (this.status == 200) {
					content.innerHTML = xhttp.responseText;
				}
				// if not found
				else if (this.status == 404) {
					content.innerHTML = '<p>Page not found.</p>';
				}
				// if cannot access
				else {
					content.innerHTML = '<p>Page cannot access.</p>';
				}
			}
		};
		xhttp.open('GET', 'pages/' + page + '.html', true);
		xhttp.send();
	}
});
