INSERT INTO `maps`(`idMap`, `nomMapa`, `urlMapa`) VALUES 
(1,'Ciudad Céfiro','img/ciudadCefiro_SG_CE.dib'),
(2,'Bosque de las Horas','img/bosqueHoras_SG_SE.dib'),
(3,'Lago Themis','img/lagoThemis_SG_SE.dib');

INSERT INTO `game`(`spritePosX`, `spritePosY`, `mapPosX`, `mapPosY`, `idMap`, `newGame`) VALUES 
(144,112,0,0,1,false),
(16,432,0,-240,2,true),
(32,416,0,-224,3,true);

INSERT INTO `user`(`name`, `password`, `mail`, `idGame`) VALUES 
('eli','eli','eli@gmail.com',1),
('quel','quel','quel@gmail.com',2),
('miquel','miquel','miquel@gmail.com',3);

INSERT INTO `types`(`idType`, `nameType`) VALUES 
(1,'Luz'),
(2,'Aire'),
(3,'Agua'),
(4,'Naturaleza'),
(5,'Tierra'),
(6,'Fuego'),
(7,'Hielo'),
(8,'Electricidad'),
(9,'Mental'),
(10,'Oscuridad');

INSERT INTO `chachis`(`idChachi`, `idType`, `name`, `base_HP`, `base_AT`, `base_DF`, `base_VE`, `base_MP`, `base_EX`, `sprite_url`) VALUES 
(1,1,'Chachi de la Luz',80,80,80,100,90,50,'img/chachis/chachiLuz.png'),
(2,2,'Chachi del Aire',70,70,70,90,80,50,'img/chachis/chachiAire.png'),
(3,3,'Chachi del Agua',90,80,80,80,90,50,'img/chachis/chachiAgua.png'),
(4,4,'Chachi de la Naturaleza',70,80,90,60,80,50,'img/chachis/chachiNaturaleza.png'),
(5,5,'Chachi de la Tierra',80,100,100,60,70,50,'img/chachis/chachiTierra.png'),
(6,6,'Chachi del Fuego',70,90,80,90,80,50,'img/chachis/chachiFuego.png'),
(7,7,'Chachi del Hielo',80,80,90,70,100,50,'img/chachis/chachiHielo.png'),
(8,8,'Chachi de la Elect.',70,90,70,100,90,50,'img/chachis/chachiElectricidad.png'),
(9,9,'Chachi de la Mente',100,90,80,70,80,50,'img/chachis/chachiMente.png'),
(10,10,'Chachi Oscuro',90,90,90,100,90,50,'img/chachis/chachiOscuridad.png'),
(11,1,'Héroe',80,80,80,100,90,50,'img/chachis/heroe.png'),
(12,10,'Chachimolnga',80,80,80,100,90,50,'img/chachis/chachimolnga.png');

INSERT INTO `mapschachis`(`idMap`, `idChachi`, `minLevel`, `maxLevel`) VALUES 
(1,3,2,4),
(1,8,2,4),
(2,4,3,5),
(3,3,5,7),
(3,4,5,7);

INSERT INTO `fixedenemies`(`idenemy`, `idChachi`, `nameFE`, `level`) VALUES 
(1,10,'Chachi Oscuro Sospechoso',3),
(2,4,'Chachi Guardían Naturaleza',7),
(3,3,'Chachi Guardían Agua',8);

INSERT INTO `secundaryeffect`(`idEffect`, `description`) VALUES 
(0,'---'),
(1,'Protege');

INSERT INTO `moves`(`idmove`,`moveName`, `description`, `idType`, `PM`, `power`, `accuracy`, `idEffect`) VALUES 
(999,'Sin Mov.','---',1,0,0,0,0),
(1,'Chispa','Crea una chispa de luz dañina.',1,2,20,100,0),
(2,'Flash','Crea un flash cegador para ocultarse.',1,4,0,100,1),
(3,'Lux','Crea un haz de luz dañino.',1,5,35,100,0),
(4,'Rayo de Luz','Lanza un Rayo de luz al rival.',1,9,50,95,0),
(5,'Luz Irisada','Crea una luz irisada muy dañina.',1,15,55,95,0),
(6,'Luz Matinal','Crea una luz matinal muy dañina.',1,20,60,90,0),
(7,'Viento Lumínico','Invoca un fuerte viento cegador.',1,25,80,85,0),
(10,'Brisa','Crea una pequeña brisa.',2,2,20,100,0),
(11,'Racha','Crea una barrera de viento.',2,4,0,100,1),
(12,'Viento','Invoca un viento moderado.',2,3,35,100,0),
(13,'Vendaval','Invoca fuertes vientos.',2,6,50,95,0),
(14,'Levantada','Simula una levantada cerca del mar.',3,8,55,95,0),
(15,'Tornado','Crea un feroz tornado.',2,12,65,90,0),
(16,'Huracán','Invoca un huracán.',2,24,80,85,0),
(20,'Riachuelo','Invoca un pequeño riachuelo de agua.',3,2,20,100,0),
(21,'Salpicar','Crea una barrera de agua.',3,4,0,100,1),
(22,'Manga de Agua','Invoca una fuerte manga de agua.',3,4,35,100,0),
(23,'Oleaje','Invoca un fuerte oleaje.',3,8,50,95,0),
(24,'Corriente Mar.','Lanza una corriente marina al rival.',3,10,55,95,0),
(25,'Tifón','Invoca un poderoso tifón.',3,15,70,90,0),
(26,'Maremoto','Crea un maremoto.',3,25,80,85,0),
(30,'Lanzasemillas','Lanza una ráfaga de semillas.',4,2,20,100,0),
(31,'Barrera de Hojas','Crea una Barrera de ramas para protegerse.',4,4,0,100,1),
(32,'Golpe de Rama','Golpea con ramas.',4,4,35,100,0),
(33,'Esporas','Lanza esporas al rival.',4,8,50,95,0),
(34,'Ráfaga de Hojas','Lanza una ráfaga de hojas al rival.',4,12,55,95,0),
(35,'Fotosíntesis','Absorbe la luz con la fotosíntesi y golpea.',10,18,70,90,0),
(36,'Rama Espinada','Golpea con una rama llena de espinas.',4,24,80,85,0),
(40,'Lanza Arena','Lanza una puñado de Arena.',5,3,25,100,0),
(41,'Muralla de Piedras','Crea una muralla de piedras para protegerse.',5,4,0,100,1),
(42,'Lanzapiedras','Lanza piedras al rival.',5,4,35,100,0),
(43,'Excavar','Excava un agujero para hacer caer al rival.',5,8,50,95,0),
(44,'Roca Afilada','Ataca con afiladas rocas.',5,15,60,95,0),
(45,'Desprendimiento','Provoca una caiguda de roques.',5,20,75,90,0),
(46,'Terremoto','Crea un terremoto.',5,26,85,85,0),
(50,'Ascuas','Lanza unas ascuas a los pies.',6,2,20,100,0),
(51,'Columna de Fuego','Crea colmnas ígneas para protegerse.',6,4,0,100,1),
(52,'Golpe de Fuego','Se rodea de fuego para golpear.',6,4,30,100,0),
(53,'Onda Ígnea','Invoca una ola de calor.',6,8,45,95,0),
(54,'Bola de Fuego','Lanza una bola de Fuego al rival.',6,12,60,95,0),
(55,'Llamarada','Lanza una llamarada al rival.',6,18,70,90,0),
(56,'Infierno','Envuelve en lava al rival.',6,23,80,85,0),
(60,'Viento Helado','Lanza un viento helado al rival.',7,2,20,100,0),
(61,'Pantalla de Hielo','Crea una pantalla helada para protegerse.',7,4,0,100,1),
(62,'Nieve Nueva','Invoca una nevada.',7,4,30,100,0),
(63,'Carámbano','Lanza carámbanos al rival.',7,7,45,95,0),
(64,'Granizo','Invoca una granizada.',7,14,65,95,0),
(65,'Rayo de Hielo','Lanza un rayo de hielo al rival.',7,22,75,90,0),
(66,'Ventisca','Invoca una fuerte ventisca.',7,30,90,85,0),
(70,'Calambre','Da un calambrazo al rival.',8,2,20,100,0),
(71,'Onda Eléctrica','Crea una barrera eléctrica que repele los ataques.',8,4,0,100,1),
(72,'Chispazo','Descarga un chispazo sobre el rival.',8,4,30,100,0),
(73,'Descarga','Descarga electricidad sobre el rival.',8,8,45,95,0),
(74,'Rayo','Lanza un rayo al rival.',8,14,60,95,0),
(75,'Arco Eléctrico','Crea un arco eléctrico hacía el rival.',8,20,70,90,0),
(76,'Trueno','Lanza un poderoso rayo amplificado por truenos.',8,26,80,85,0),
(80,'Magia','Crea un hechizo mágico dañino.',9,2,20,100,0),
(81,'Telepatía','Bloquea los movimientos del rival por telepatía.',9,4,0,100,1),
(82,'Hechizo','Hechiza al rival para causar daños.',9,5,30,100,0),
(83,'Confusión','Libera poder mental para dañar al rival.',9,9,45,95,0),
(84,'Ilusión','Crea alucinaciones sobre el rival para dañarle.',9,15,55,95,0),
(85,'Onda Cerebral','Dispara una onda cerebral dañina.',9,21,65,90,0),
(86,'Psíquico','Daña al rival con poderes psíquicos.',9,25,80,85,0),
(90,'Sombra','Lanza sombras sobre el enemigo.',10,2,20,100,0),
(91,'Absorber Luz','Absorbe la luz para evitar ser golpeado.',10,4,0,100,1),
(92,'Maldición','Lanza una malidición sobre el enemigo.',10,5,30,100,0),
(93,'Infortúnio','Atormenta al enemigo con infortunios.',10,8,50,95,0),
(94,'Rayo Sombra','Lanza un rayo de sombras sobre el rival.',10,15,70,95,0),
(95,'Tinieblas','Invoca las tinieblas sobre el rival.',10,20,80,90,0),
(96,'Oscuridad','Llena el ambiente de oscuridad dañina.',10,30,90,85,0),
(97,'Golpe Espectral','Poderoso golpe fantasmagórico sobre el rival.',10,50,110,70,0);



INSERT INTO `movechachi`(`idChachi`, `idMove`, `levelRequired`) VALUES 
(1,1,0),
(1,2,2),
(1,3,4),
(1,4,7),
(1,5,10),
(1,6,14),
(1,7,17),
(2,10,0),
(2,11,2),
(2,12,4),
(2,13,8),
(2,14,10),
(2,15,13),
(2,16,18),
(3,20,0),
(3,21,3),
(3,22,5),
(3,23,8),
(3,24,12),
(3,25,15),
(3,26,18),
(4,30,0),
(4,31,3),
(4,32,5),
(4,33,8),
(4,34,12),
(4,35,14),
(4,36,18),
(5,40,0),
(5,41,3),
(5,42,5),
(5,43,8),
(5,44,12),
(5,45,15),
(5,46,19),
(6,50,0),
(6,51,3),
(6,52,5),
(6,53,8),
(6,54,11),
(6,55,15),
(6,56,18),
(7,60,0),
(7,61,3),
(7,62,5),
(7,63,8),
(7,64,11),
(7,65,14),
(7,66,17),
(8,70,0),
(8,71,3),
(8,72,5),
(8,73,8),
(8,74,11),
(8,75,14),
(8,76,17),
(9,80,0),
(9,81,3),
(9,82,5),
(9,83,8),
(9,84,11),
(9,85,14),
(9,86,17),
(10,90,0),
(10,91,3),
(10,92,5),
(10,93,8),
(10,94,11),
(10,95,14),
(10,96,17),
(10,97,20);

INSERT INTO `chachisgame`(`idGame`, `idChachi`, `level`, `HP`, `MP`, `idMov_1`, `idMov_2`, `idMov_3`, `idMov_4`, `EXP`, `teamPosition`) VALUES 
(1,9,5,45,70,80,81,82,999,100,1),
(2,9,5,45,70,80,81,82,999,100,1),
(3,9,7,55,94,80,81,82,999,100,1),
(3,4,7,45,94,30,31,32,999,275,2);

INSERT INTO `eventstate`(`idEventState`, `description`) VALUES 
(0,'NO Completado'),
(1,'Conseguido!');

INSERT INTO `events`(`idEvent`, `description`, `repeatedBox`, `idMap`) VALUES 
('CEF_101','Event Inicial on expliquen que ha passat als chachis',1,1),
('CEF_102','Event introductori dels combats',1,1),
("BHO_101","Chachis debatent i surten asustats.",5,2),
("BHO_102","Chachis Natura Crida.",0,2),
("BHO_103","Chachis Natura i foscos ataquen.",5,2),
("LTH_101","Chachi Aigua va pel llaca confós.",1,3),
("LTH_102","Combat amb el Chachi Aigua.",1,3),
("LTH_103","Enfosqueix el mapa uns segons.",3,3);

INSERT INTO `gameevents`(`idGame`, `idEvent`, `idEventState`) VALUES 
(1,'CEF_101',0),
(1,'CEF_102',0),
(1,'BHO_101',0),
(1,'BHO_102',0),
(1,'BHO_103',0),
(1,'LTH_101',0),
(1,'LTH_102',0),
(1,'LTH_103',0),
(2,'CEF_101',1),
(2,'CEF_102',1),
(2,'BHO_101',0),
(2,'BHO_102',0),
(2,'BHO_103',0),
(2,'LTH_101',0),
(2,'LTH_102',0),
(2,'LTH_103',0),
(3,'CEF_101',1),
(3,'CEF_102',1),
(3,'BHO_101',1),
(3,'BHO_102',1),
(3,'BHO_103',1),
(3,'LTH_101',0),
(3,'LTH_102',0),
(3,'LTH_103',0);