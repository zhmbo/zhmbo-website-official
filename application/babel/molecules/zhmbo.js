var renderer, scene, camera, ww, wh, particles;

ww = window.innerWidth,
	wh = window.innerHeight;

var centerVector = new THREE.Vector3(0, 0, 0);
var previousTime = 0
speed = 10
isMouseDown = false;

var getImageData = function (image) {

	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(image, 0, 0);

	return ctx.getImageData(0, 0, image.width, image.height);
}

function getPixel(imagedata, x, y) {
	var position = (x + imagedata.width * y) * 4,
		data = imagedata.data;
	return {
		r: data[position],
		g: data[position + 1],
		b: data[position + 2],
		a: data[position + 3]
	};
}

var drawTheMap = function () {
	if (particles) scene.remove(particles);
	if (geometry) geometry.dispose();
	if (material) material.dispose();

	var geometry = new THREE.Geometry();
	var material = new THREE.PointCloudMaterial();
	material.vertexColors = true;
	material.transparent = true;
	for (var y = 0, y2 = imagedata.height; y < y2; y += 1) {
		for (var x = 0, x2 = imagedata.width; x < x2; x += 1) {
			if (imagedata.data[(x * 4 + y * 4 * imagedata.width)] > 0) {

				var vertex = new THREE.Vector3();
				vertex.x = x - imagedata.width / 2 + (500 - 440 * .5);
				vertex.y = -y + imagedata.height / 2;
				vertex.z = -Math.random() * 500;

				vertex.speed = Math.random() / speed + 0.015;

				var pixelColor = getPixel(imagedata, x, y)
				var color = "rgb(" + pixelColor.r + ", " + pixelColor.g + ", " + pixelColor.b + ")"
				geometry.colors.push(new THREE.Color(color));
				geometry.vertices.push(vertex);
			}
		}
	}
	particles = new THREE.Points(geometry, material);

	scene.add(particles);

	requestAnimationFrame(render);
};

var init = function (image) {
	renderer = new THREE.WebGLRenderer({
		canvas: document.getElementById("zhmbo"),
		antialias: true,
		alpha: true
	});
	renderer.setSize(ww, wh);

	scene = new THREE.Scene();

	camera = new THREE.OrthographicCamera(ww / -2, ww / 2, wh / 2, wh / -2, 1, 1000);
	camera.position.set(0, -20, 4);
	camera.lookAt(centerVector);
	scene.add(camera);
	camera.zoom = 1;
	camera.updateProjectionMatrix();

	imagedata = getImageData(image);
	drawTheMap();

	window.addEventListener('mousemove', onMousemove, false);
	window.addEventListener('mousedown', onMousedown, false);
	window.addEventListener('mouseup', onMouseup, false);
	window.addEventListener('resize', onResize, false);

};
var onResize = function () {
	ww = window.innerWidth;
	wh = window.innerHeight;
	renderer.setSize(ww, wh);
	camera.left = ww / -2;
	camera.right = ww / 2;
	camera.top = wh / 2;
	camera.bottom = wh / -2;
	camera.updateProjectionMatrix();
};

var onMouseup = function () {
	isMouseDown = false;
}
var onMousedown = function (e) {
	isMouseDown = true;
	lastMousePos = {
		x: e.clientX,
		y: e.clientY
	};
};
var onMousemove = function (e) {
	if (isMouseDown) {
		camera.position.x += (e.clientX - lastMousePos.x) / 100;
		camera.position.y -= (e.clientY - lastMousePos.y) / 100;
		camera.lookAt(centerVector);
		lastMousePos = {
			x: e.clientX,
			y: e.clientY
		};
	}
};

var render = function (a) {

	requestAnimationFrame(render);


	particles.geometry.verticesNeedUpdate = true;
	if (!isMouseDown) {
		camera.position.x += (0 - camera.position.x) * 0.06;
		camera.position.y += (0 - camera.position.y) * 0.06;
		camera.lookAt(centerVector);
	}

	renderer.render(scene, camera);
};

function loadImageWithUrl(url, callback) {
	var canvas = document.createElement('CANVAS'),
		ctx = canvas.getContext('2d'),
		img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function () {
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL('image/png');
		callback.call(this, dataURL);
		canvas = null;
	};
	img.src = url;
}

var zhmbo = {
	load: function (source) {
		// 0.加载本地图片
		// var imgData;
		// if (source == 'home') imgData = 'includes/images/zhmbo-home.png';
		// else if (source == 'secret') imgData = 'includes/images/zhmbo-secret.png';
		// else if (source == 'bucket') imgData = 'includes/images/zhmbo-bucket.png';
		// else if (source == 'projectsAll') imgData = 'includes/images/zhmbo-projects.png';
		// else if (source == 'thoughtsAll') imgData = 'includes/images/zhmbo-thoughts.png';
		// else if (source == 'aboutme') imgData = 'includes/images/zhmbo-aboutme.png';
		// else if (source == 'notFound') imgData = 'includes/images/zhmbo-notFound.png';
		// var image = document.createElement("img");
		// image.onload = function () {
		// 	init(image)
		// };
		// image.src = imgData;

		// 1.将所有图片放在静态页面中随机加载，弊端就是造成静态博客体积太大，每次同步部署的时候tai'hao'shi
		// var imgName = Math.floor(Math.random() * 365);
		// imgData = 'includes/images/cartoon/image_' + imgName + '.png';

		// 2.将图片放进图床中每次进行下载，虽然不会每次都缓存但是好处多多
		var img_num = Math.floor(Math.random() * 365);
		// https://cdn.jsdelivr.net/gh/zhmbo/static@master/img/cartoon/image_0.png
		var img_url = 'https://cdn.jsdelivr.net/gh/zhmbo/static@master/img/cartoon/image_' + img_num + '.png';
		loadImageWithUrl(img_url, function (img) {
			var image = document.createElement("img");
			image.onload = function () {
				init(image)
			};
			image.src = source == 'aboutme' ? 'includes/images/zhmbo-aboutme.png' : img;
		})
	}
}

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?340ae86ed0846693ad7ca14ab6123a00";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();