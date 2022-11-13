<img src="https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/bedulogo/original.png?1596745896" align="right" height="100" width="100" hspace="10">

# MoviesAPI - Bedu


Proyecto de Backend para el modulo uno de la fase 3.
#Integrantes:
- Gonzalo Olvera [Github](https://github.com/olvera93 "Github")
- Emanuel Alamilla Hernandez [Github](https://github.com/Changaloco "Github")
- Jorge Lopez [Github](https://github.com/Jorg3Lop3z "Github")
- Oscar Jaime [Github](https://github.com/Oscar13G "Github")
------------


#Link del proyecto desplegado: [API](http://https://proyectof3p1-production.up.railway.app/ "API")

# Funciones implementadas

**Usuarios**
**Datos{
  "name":"zeus",
  "surname":"alamilla",
  "email":"zeus@correo.com",
  "password":"alaskawamas1000",
  "type":"user"
}**
- Login('/api/users/login')
- Register('/api/users/register')
**Los user pueden acceder solo a peticiones de tipo get , mientras que admin puede acceder a todos los demas , login y register son disponibles sin necesidad de token de autorizacion el cual es enviado mediante un header authorization**
------------
**Peliculas**
**datosEjemplo:{
	"title":"La toalla del mojado 4",
	"date":"2022-01-20",
	"duration":120,
	"plot":"Una gran pelicula sobre la toalla del mojado",
	"poster":"https://www.nacionrex.com/__export/1513982279509/sites/debate/img/2017/12/22/baby_driver_poster.jpg_458947530.jpg",
	"fk_id_genre":1,
	"fk_id_director":1
}**
- Get('api/movies')
- GetOne('api/movies/:id')
- GetCast ('api/movies/:id/cast')
- Create ('api/movies')
- Update ('api/movies/:id')
- Delete ('api/movies/:id')
------------
**Directores**
**datos:{
		"name": "Guillermo",
		"surname": "DelToro",
		"country": "US",
		"birth": "2000-11-11T00:00:00.000Z",
		"gender": "Male"
}**
- Get('api/directors')
- GetOne('api/directors/:id')
- GetOneMovies ('api/directors/:id/cast')
- Create ('api/directors')
- Update ('api/directors/:id')
- Delete ('api/directors/:id')
------------
**Actores**
**datos:{
		"name": "Brie",
		"surname": "Larson",
		"country": "US",
		"birth": "2000-11-11T00:00:00.000Z",
		"gender": "Female"
}**
- Get('api/actors')
- GetOne('api/actors/:id')
- GetOneMovies ('api/actors/:id/cast')
- Create ('api/actors')
- Update ('api/actors/:id')
- Delete ('api/actors/:id')
------------
**Generos**
**datos:{
	"name": "Drama"
}**
- Get('api/genres')
- GetOne('api/genres/:id')
- GetOneMovies ('api/genres/:id/cast')
- Create ('api/genres')
- Update ('api/genres/:id')
- Delete ('api/genres/:id')
------------
**Casts**
**datos:{
	"fk_id_movie":4,
	"fk_id_actor":2
}**
- Get('api/casts')
- GetOne('api/casts/:id')
- Create ('api/casts')
- Update ('api/casts/:id')
- Delete ('api/casts/:id')

