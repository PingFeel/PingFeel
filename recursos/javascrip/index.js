window.onload = function () {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.transform = 'scale(0)'; // Escala a 0 para hacer el efecto de encogimiento
        preloader.style.opacity = '0'; // Cambia la opacidad a 0
        setTimeout(() => {
            preloader.style.display = 'none';
            document.querySelector('#home').style.display = 'flex'; // Muestra la sección principal
        }, 1000); // Espera a que termine la animación de escala
    }, 2000); // Mantiene visible el preloader por 2 segundos

    const greetingElement = document.getElementById('greeting');
    const verseElement = document.getElementById('verse');
    const penguinImage = document.getElementById('penguinImage');
    const body = document.body;

    const currentHour = new Date().getHours();
    if (currentHour < 5 || currentHour >= 19) { // De 7 PM a 5 AM
        greetingElement.innerText = "¡Buenas Noches, Dámaris!";
        penguinImage.src = "recursos/penguinnight.png";
        verseElement.innerText = "Versículo de la noche:\n'El Señor es mi luz y mi salvación; ¿de quién temeré?' - Salmo 27:1";
        body.setAttribute('data-time', 'night');
    } else { // De 5 AM a 7 PM
        greetingElement.innerText = "¡Buenos Días, Dámaris!";
        penguinImage.src = "recursos/01.gif";
        verseElement.innerText = "Versículo del día:\n'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.'\n - Lamentaciones 3:22-23";
        body.setAttribute('data-time', 'day');
    }

    // Manejo del modal
    const emotionButtons = document.querySelectorAll('.emotion-button');
    const modal = document.getElementById('modal');
    const modalVerse = document.getElementById('modalVerse');
    const copyButton = document.getElementById('copyButton');
    const closeModal = document.getElementById('closeModal');

    // Array de versículos para cada emoción
    const verses = {
        "Feliz": [
            "'Me mostrarás la senda de la vida; En tu presencia hay plenitud de gozo; Delicias a tu diestra para siempre.' - Salmo 16:11",
            "'Porque no durará su ira para siempre, sino que de su favor depende la vida; Por la noche durará el lloro, y a la mañana vendrá la alegría.' - Salmo 30:5",
            "'Grandes cosas ha hecho Jehová con nosotros; Estaremos alegres.' - Salmo 126:3",
            "'Servid a Jehová con alegría; Venid ante su presencia con regocijo.' - Salmo 100:2",
            "'El corazón alegre hermosea el rostro; Mas por el dolor del corazón el espíritu se abate.' - Proverbios 15:13",
            "'La luz está sembrada para el justo, y la alegría para los rectos de corazón.' - Salmo 97:11",
            "'Este es el día que hizo Jehová; Nos gozaremos y alegraremos en él.' - Salmo 118:24",
            "'Y el Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza por el poder del Espíritu Santo.' - Romanos 15:13",
            "'A quien, no habiendo visto, amáis; en quien, ahora no viendo, creéis; y os alegráis con gozo inefable y lleno de gloria.' - 1 Pedro 1:8",
            "'Y les dijo: Id, comed lo gordo y vivid lo dulce, y enviad porciones a los que no tienen nada preparado; porque día santo es a nuestro Señor; no os entristezcáis, porque el gozo de Jehová es vuestra fuerza.' - Nehemías 8:10",
            "'Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!' - Filipenses 4:4",
            "'Canten y alégrense los que favorecen mi justa causa; y digan siempre: Sea Jehová engrandecido, que ama la paz de su siervo.' - Salmo 35:27",
            "'Iré al altar de Dios, Al Dios de mi alegría y de mi gozo; Y te alabaré con arpa, oh Dios, Dios mío.' - Salmo 43:4",
            "'Yo he conocido que no hay nada mejor para ellos que alegrarse y hacer bien en su vida.' - Eclesiastés 3:12",
            "'Mas los justos se alegrarán; se alegrarán delante de Dios, y saltarán de alegría.' - Salmo 68:3",
            "'Me alegraré y me regocijaré en ti; Cantaré a tu nombre, oh Altísimo.' - Salmo 9:2",
            "'Con gran gozo me alegraré en Jehová; mi alma se regocijará en mi Dios; porque me vistió con vestiduras de salvación, me rodeó de manto de justicia.' - Isaías 61:10",
            "'Israel se alegrará en su Hacedor; los hijos de Sion se gozarán en su Rey.' - Salmo 149:2",
            "'Pero alegrense todos los que en ti confían; Den gritos de júbilo para siempre, porque tú los defiendes; en ti se regocijen los que aman tu nombre.' - Salmo 5:11",
            "'Como de la grosura y de la abundancia serás saciado; y con labios de júbilo te alabaré.' - Salmo 63:5",
            "'Porque le has dado a él, por bendición, la alegría; le pusiste sobre la cabeza una corona de oro fino.' - Salmo 21:6",
            "'El corazón alegre constituye buen remedio; Mas el espíritu triste seca los huesos.' - Proverbios 17:22",
            "'Entonces nuestra boca se llenó de risa, y nuestra lengua de alabanza; entonces dirán entre las naciones: Grandes cosas ha hecho Jehová con estos.' - Salmo 126:2",
            "'Sacaréis con gozo aguas de las fuentes de la salvación.' - Isaías 12:3",
            "'Anhela, y aun ardientemente desea, mis almas, los atrios de Jehová; mi corazón y mi carne cantan al Dios vivo.' - Salmo 84:2",
            "'Has cambiado mi lamento en baile; Desataste mi cilicio, y me has ceñido de alegría.' - Salmo 30:11",
            "'Cuando Jehová hizo volver a los cautivos de Sion, fuimos como los que sueñan.' - Salmo 126:1",
            "'Cantad a Dios, cantad salmos a su nombre; Exaltad al que cabalga sobre los cielos; Jehová es su nombre; alegraos delante de él.' - Salmo 68:4",
            "'Los santos se alegrarán en gloria; y cantarán con júbilo en sus camas.' - Salmo 149:5",
            "'La voz de alegría y de salvación hay en las tiendas de los justos; la diestra de Jehová hace proezas.' - Salmo 118:15",
            "'Porque el reino de Dios no es comida ni bebida, sino justicia, paz y gozo en el Espíritu Santo.' - Romanos 14:17",
            "'Tú me harás ver cosas grandes y ocultas que tú no conoces.' - Jeremías 33:3",
            "'Y aquellos que temen a Jehová hablarán el uno al otro; Y Jehová escuchará y oirá; y será escrito un libro de memoria delante de él para los que temen a Jehová y para los que piensan en su nombre.' - Malaquías 3:16",
            "'Se alegrarán los justos cuando vean la venganza; Lavarán sus pies en la sangre de los impíos.' - Salmo 58:10",
            "'Se llenará de alegría mi alma en Jehová; Mi espíritu se alegrará en mi Dios; Porque me ha vestido con vestiduras de salvación; Me ha cubierto con el manto de justicia.' - Isaías 61:10",
            "'Los justos se alegrarán y saltarán de alegría; Y cantarán con júbilo.' - Salmo 68:3",
            "'Los caminos de Jehová son rectos; Los justos en ellos caminarán, Mas los pecadores caerán en ellos.' - Oseas 14:9",
            "'Y será como árbol plantado junto a corrientes de aguas, Que da su fruto en su tiempo, Y su hoja no cae; Y todo lo que hace, prosperará.' - Salmo 1:3",
            "'Me alegraré en el gozo de la tierra, Y me deleitaré en el Señor de la cosecha.' - Salmo 4:7",
            "'Te alabaré, oh Jehová, de todo corazón; Contaré todas tus maravillas.' - Salmo 9:1",
            "'Alabaré a Jehová mientras viva; Cantaré salmos a mi Dios mientras exista.' - Salmo 146:2",
            "'Porque Jehová es bueno; Su misericordia es eterna, Y su verdad por todas las generaciones.' - Salmo 100:5",
            "'Gozaos en Jehová; alegraos en el Dios de nuestra salvación.' - Salmo 35:9",
            "'Tu justicia es como las montañas de Dios; Tus juicios son un gran abismo; Los hombres y las bestias salvas, Jehová.' - Salmo 36:6"
        ],
        "Agradecida": [
            "'Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.' - 1 Tesalonicenses 5:18",
            "'Alabad a Jehová, porque él es bueno; porque para siempre es su misericordia.' - Salmo 136:1",
            "'Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza; Alabadle, bendecid su nombre.' - Salmo 100:4",
            "'Te alabaré, oh Jehová, de todo corazón; Contaré todas tus maravillas.' - Salmo 9:1",
            "'Alzad a Jehová vuestras manos, y bendecid a Jehová.' - Salmo 134:2",
            "'Porque tú, Jehová, eres bueno y perdonas; Eres abundante en misericordia para con todos los que te invocan.' - Salmo 86:5",
            "'Alabad a Jehová, porque él es bueno; Porque para siempre es su misericordia.' - Salmo 136:1",
            "'Doy gracias a mi Dios siempre que me acuerdo de vosotros en todas mis oraciones.' - Filipenses 1:3",
            "'El corazón del sabio está a la diestra, mas el corazón del necio a la siniestra.' - Eclesiastés 10:2",
            "'Y habiendo dado gracias, lo partió y dijo: Tomad, comed; esto es mi cuerpo, que por vosotros es partido; haced esto en memoria de mí.' - Lucas 22:19",
            "'Todo lo que respira alabe a Jehová. Aleluya.' - Salmo 150:6",
            "'La oración de fe salvará al enfermo, y el Señor lo levantará; y si hubiere cometido pecados, les serán perdonados.' - Santiago 5:15",
            "'Porque tú eres mi esperanza, oh Señor Jehová; Confianza mía desde mi juventud.' - Salmo 71:5",
            "'Por tanto, si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.' - 2 Corintios 5:17",
            "'¡Cuán grandes son tus obras, Jehová! ¡Muy profundos son tus pensamientos!' - Salmo 92:5",
            "'La paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.' - Filipenses 4:7",
            "'¿Qué daré a Jehová por todos sus beneficios para conmigo?' - Salmo 116:12",
            "'Te alabaré, oh Jehová, porque me has librado, y no has hecho que mis enemigos se regocijen sobre mí.' - Salmo 30:1",
            "'Y yo te alabaré, Jehová, entre los pueblos; A ti cantaré salmos entre las naciones.' - Salmo 108:3",
            "'Y el Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza por el poder del Espíritu Santo.' - Romanos 15:13",
            "'Por tanto, al entrar en el templo, le alabaron.' - Lucas 17:15",
            "'Oh Jehová, mi Dios, te exaltaré; Te alabaré por siempre.' - Salmo 30:12",
            "'Toda buena dádiva y todo don perfecto descienden de lo alto, del Padre de las luces.' - Santiago 1:17",
            "'Gracias, oh Dios; porque has escuchado mis peticiones y me has dado un lugar en tu casa.' - Salmo 66:19",
            "'A ti, oh Dios, te alabamos; A ti, oh Dios, te reconocemos.' - Salmo 75:1",
            "'Las misericordias de Jehová son nuevas cada mañana; Grande es tu fidelidad.' - Lamentaciones 3:23",
            "'Agradecidos en todo tiempo, porque así es la voluntad de Dios en Cristo Jesús.' - 1 Tesalonicenses 5:18",
            "'Y no olvides todas sus bondades.' - Salmo 103:2",
            "'En todo tiempo sean blancos tus vestidos, y nunca falte el ungüento sobre tu cabeza.' - Eclesiastés 9:8",
            "'Así que, con acción de gracias, habéis sido llamados en un solo cuerpo.' - Colosenses 3:15",
            "'En tu presencia hay plenitud de gozo; Delicias a tu diestra para siempre.' - Salmo 16:11",
            "'Con gratitud venimos, oh Dios; porque tú eres nuestro refugio y fortaleza.' - Salmo 46:1",
            "'Porque Jehová es bueno; su misericordia es eterna, y su verdad por todas las generaciones.' - Salmo 100:5",
            "'Te alabaré, oh Jehová, con mi corazón; contaré todas tus maravillas.' - Salmo 9:1",
            "'Esforzaos todos vosotros los que esperáis en Jehová, y tomad aliento; y alégrese vuestro corazón.' - Salmo 31:24",
            "'Por eso, cantaremos al Señor, porque nos ha hecho grandes cosas.' - Salmo 126:3",
            "'Dame la alegría de tu salvación, y espíritu noble me sustente.' - Salmo 51:12",
            "'El que come mi carne y bebe mi sangre, en mí permanece, y yo en él.' - Juan 6:56",
            "'Tú me has mostrado la senda de la vida; En tu presencia hay plenitud de gozo; Delicias a tu diestra para siempre.' - Salmo 16:11",
            "'Al Señor de los ejércitos, bendito sea el nombre de Jehová.' - Salmo 68:19",
            "'No olvidéis hacer el bien y la ayuda mutua; porque de tales sacrificios se agrada Dios.' - Hebreos 13:16",
            "'Y en todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.' - Colosenses 3:23",
            "'Y seréis mis testigos en Jerusalén, en toda Judea y Samaria, y hasta lo último de la tierra.' - Hechos 1:8",
            "'Caminaremos en el nombre de Jehová, nuestro Dios, eternamente y para siempre.' - Miqueas 4:5",
            "'Por tanto, daré gracias a Jehová; Alabaré a Jehová con el canto.' - Salmo 7:17",
            "'Todo lo que respira, alabe a Jehová. Aleluya.' - Salmo 150:6",
            "'Alabaré a Jehová en todo tiempo; Su alabanza estará de continuo en mi boca.' - Salmo 34:1",
            "'Los que siembran con lágrimas, con regocijo segarán.' - Salmo 126:5"
        ],
        "Enojada": [
            "'Y no os entristezcáis, porque el gozo de Jehová es vuestra fuerza.' - Nehemías 8:10",
            "'La ira del hombre no obra la justicia de Dios.' - Santiago 1:20",
            "'No te apresures en tu espíritu a enojarte, porque el enojo reposa en el seno de los necios.' - Eclesiastés 7:9",
            "'El que es lento para la ira es grande de entendimiento; Mas el que es de espíritu impaciente enaltece la necedad.' - Proverbios 14:29",
            "'El enojo del rey es como mensajero de muerte; Mas el sabio lo apaciguará.' - Proverbios 16:14",
            "'Por tanto, despojándoos de toda malicia, de todo engaño, hipocresías, envidias y de toda difamación.' - 1 Pedro 2:1",
            "'Por esto, amados hermanos, todo hombre sea pronto para oír, tardo para hablar, tardo para airarse.' - Santiago 1:19",
            "'La paciencia es mejor que el orgullo, y el que es lento para la ira tiene gran entendimiento.' - Proverbios 16:32",
            "'Mejor es ser paciente que valiente; más vale dominarse que conquistar ciudades.' - Proverbios 16:32",
            "'No te dejes vencer por el mal, sino vence con el bien el mal.' - Romanos 12:21",
            "'El que guarda su boca y su lengua, su alma guarda de angustias.' - Proverbios 21:23",
            "'No te enojes a causa de los malignos, ni tengas envidia de los que hacen iniquidad.' - Salmo 37:1",
            "'Jehová es tardo para la ira y grande en poder, y de ningún modo tendrá por inocente al culpable.' - Nahúm 1:3",
            "'No te apresures a irte de su presencia; no persistáis en lo que cause su enojo.' - Eclesiastés 8:3",
            "'Si tu enemigo tiene hambre, dale de comer; Si tiene sed, dale de beber; Pues haciendo esto ascuas de fuego amontonará sobre su cabeza.' - Romanos 12:20",
            "'Así que, si tu ojo te es ocasión de caer, sácalo y échalo de ti; porque mejor te es que se pierda uno de tus miembros, y no que todo tu cuerpo sea echado en el infierno.' - Mateo 5:29",
            "'No os venguéis vosotros mismos, amados míos, sino dejad lugar a la ira de Dios; porque está escrito: Mía es la venganza, yo pagaré, dice el Señor.' - Romanos 12:19",
            "'La respuesta suave quita la ira; Mas la palabra áspera hace subir el furor.' - Proverbios 15:1",
            "'Saca de tu corazón el enojo y aparta de tu carne el mal.' - Eclesiastés 11:10",
            "'El corazón alegre hermosea el rostro; Mas por el dolor del corazón el espíritu se abate.' - Proverbios 15:13",
            "'No permitas que el sol se ponga sobre tu enojo.' - Efesios 4:26",
            "'El que guarda su boca y su lengua, su alma guarda de angustias.' - Proverbios 21:23",
            "'Si el corazón del rey es como aguas; en la mano de Jehová está; A todo lo que quiere lo inclina.' - Proverbios 21:1",
            "'Porque en el mucho hablar no falta pecado; Mas el que refrena sus labios es prudente.' - Proverbios 10:19",
            "'Hijo mío, no te olvides de mi ley, y tu corazón guarde mis mandamientos; porque largura de días y años de vida y paz te añadirán.' - Proverbios 3:1-2",
            "'En el día de la ira no te niegues a ti mismo; Si te enojas, asegúrate de que no te controle.' - Salmo 37:8",
            "'El que es lento para la ira es grande de entendimiento; Mas el que es de espíritu impaciente enaltece la necedad.' - Proverbios 14:29",
            "'El que no tiene control sobre su espíritu es como una ciudad sin murallas.' - Proverbios 25:28",
            "'Por esto, amados hermanos, todo hombre sea pronto para oír, tardo para hablar, tardo para airarse.' - Santiago 1:19",
            "'Tú, que te enojas fácilmente, recuerda que la paciencia es un gran regalo.' - Proverbios 14:29",
            "'El que no perdona, no puede ser perdonado.' - Mateo 6:15",
            "'El hombre sabio teme y se aparta del mal; Mas el necio se muestra arrogante y confiado.' - Proverbios 14:16",
            "'Los que son lentos para la ira tienen gran entendimiento.' - Proverbios 14:29",
            "'La paciencia es mejor que la ira.' - Proverbios 15:18",
            "'Si has de enojarte, que sea a causa de tus propios errores, y no por los de otros.' - Proverbios 29:11",
            "'Deja que la ira se consuma, y que el amor prevalezca en tu corazón.' - Proverbios 10:12",
            "'Hijo mío, no te olvides de mis enseñanzas, y guarda mis mandamientos en tu corazón.' - Proverbios 3:1",
            "'El que siembra para su carne, de la carne cosechará corrupción; mas el que siembra para el Espíritu, del Espíritu cosechará vida eterna.' - Gálatas 6:8",
            "'Los que son lentos para la ira son más sabios que los que son valientes.' - Proverbios 16:32",
            "'El que guarda su boca y su lengua, su alma guarda de angustias.' - Proverbios 21:23",
            "'No permitas que el sol se ponga sobre tu enojo.' - Efesios 4:26",
            "'El hombre sabio se calma y contiene su enojo.' - Proverbios 29:11",
            "'La paciencia es mejor que el orgullo.' - Proverbios 16:32",
            "'No os venguéis vosotros mismos, amados míos, sino dejad lugar a la ira de Dios; porque está escrito: Mía es la venganza, yo pagaré, dice el Señor.' - Romanos 12:19",
            "'Y no entristezcáis al Espíritu Santo de Dios, con el cual fuisteis sellados para el día de la redención.' - Efesios 4:30",
            "'Cuando el enojo se disipa, la paz vuelve al corazón.' - Proverbios 15:1"
        ],
        "Ansiosa": [
            "'Echa sobre Jehová tu carga, y él te sustentará; no dejará para siempre caído al justo.' - Salmo 55:22",
            "'No os afanéis por nada, sino sean conocidas vuestras peticiones delante de Dios.' - Filipenses 4:6",
            "'Por tanto, os digo: No os afanéis por vuestra vida, qué comeréis o qué beberéis; ni por vuestro cuerpo, qué vestiréis. No es la vida más que el alimento, y el cuerpo más que el vestido?' - Mateo 6:25",
            "'Considerad las aves del cielo, que no siembran, ni ciegan, ni recogen en graneros; y vuestro Padre celestial las alimenta. ¿No sois vosotros mucho mejores que ellas?' - Mateo 6:26",
            "'Y si Dios viste así la hierba del campo, que hoy es, y mañana es echada en el horno, ¿no hará mucho más a vosotros, hombres de poca fe?' - Mateo 6:30",
            "'No os angustiéis en el día de la angustia, ni se turbe vuestro corazón; confiad en Jehová.' - Salmo 27:3",
            "'Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?' - Salmo 27:1",
            "'Todo lo puedo en Cristo que me fortalece.' - Filipenses 4:13",
            "'Porque yo sé los planes que tengo para vosotros, dice Jehová, planes de paz, y no de mal, para daros el fin que esperáis.' - Jeremías 29:11",
            "'En el día que temo, yo en ti confío.' - Salmo 56:3",
            "'Acercaos a Dios, y él se acercará a vosotros.' - Santiago 4:8",
            "'Así que, no os afanéis por el día de mañana; porque el día de mañana traerá su afán; basta a cada día su propio mal.' - Mateo 6:34",
            "'En paz me acostaré, y asimismo dormiré; porque sólo tú, Jehová, me haces vivir confiado.' - Salmo 4:8",
            "'Porque la aflicción momentánea produce en nosotros un cada vez más excelente y eterno peso de gloria.' - 2 Corintios 4:17",
            "'El Señor te guardará de todo mal; él guardará tu alma.' - Salmo 121:7",
            "'Mucha paz tienen los que aman tu ley, y no hay para ellos tropiezo.' - Salmo 119:165",
            "'Los justos claman, y Jehová oye, y los libra de todas sus angustias.' - Salmo 34:17",
            "'El nombre de Jehová es torre fuerte; a él correrá el justo, y será levantado.' - Proverbios 18:10",
            "'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré y te sustentaré con la diestra de mi justicia.' - Isaías 41:10",
            "'Jehová, tú me guardarás; de esta generación me preservarás para siempre.' - Salmo 12:7",
            "'Bendito el hombre que confía en Jehová, y cuya confianza es Jehová.' - Jeremías 17:7",
            "'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.' - Salmo 91:1",
            "'Así que no temáis; más valéis vosotros que muchos pajarillos.' - Lucas 12:7",
            "'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.' - Salmo 46:1",
            "'No os dejéis llevar de diversas y extrañas doctrinas; porque buena cosa es afirmar el corazón con la gracia.' - Hebreos 13:9",
            "'Los que miran a él son alumbrados, y sus rostros no se avergonzarán.' - Salmo 34:5",
            "'En la angustia invocamos a Jehová; y él nos oyó.' - Salmo 120:1",
            "'Ciertamente en vano se esfuerzan los hombres; pero el que espera en Jehová tiene paz.' - Salmo 127:2",
            "'Pero el que confía en Jehová, su misericordia lo rodeará.' - Salmo 32:10",
            "'La esperanza de los justos es alegría; Mas la expectativa de los impíos perecerá.' - Proverbios 10:28",
            "'Cuando pases por las aguas, yo estaré contigo; y si por los ríos, no te ahogarán; y si por el fuego, no te quemarás, ni la llama arderá en ti.' - Isaías 43:2",
            "'El Señor es cercano a los quebrantados de corazón; y salva a los contritos de espíritu.' - Salmo 34:18",
            "'Tu bondad y tu misericordia me seguirán todos los días de mi vida.' - Salmo 23:6",
            "'Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.' - Salmo 23:4",
            "'Echa sobre Jehová tu carga, y él te sustentará; no dejará para siempre caído al justo.' - Salmo 55:22",
            "'Jehová está cerca de todos los que le invocan, de todos los que le invocan de veras.' - Salmo 145:18",
            "'Y en toda angustia que les sobrevino, él también fue angustiado; y el ángel de su presencia los salvó; en su amor y en su clemencia los redimió.' - Isaías 63:9",
            "'Mas tú, Jehová, eres escudo alrededor de mí; mi gloria, y el que levanta mi cabeza.' - Salmo 3:3",
            "'La ansiedad en el corazón del hombre lo deprime; Mas la buena palabra lo alegra.' - Proverbios 12:25",
            "'Si te dijere: No temas; yo estaré contigo; no desmayes, porque yo soy tu Dios.' - Isaías 41:10",
            "'He aquí, yo estoy con vosotros todos los días, hasta el fin del mundo.' - Mateo 28:20",
            "'Pero el que espera en Jehová renovará sus fuerzas; levantará alas como las águilas; correrá, y no se cansará; caminará, y no se fatigará.' - Isaías 40:31",
            "'Pero si alguna de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.' - Santiago 1:5"
        ],
        "Solitaria": [
            "'El Señor está cerca de los quebrantados de corazón, y salva a los contritos de espíritu.' - Salmo 34:18",
            "'Yo estaré con vosotros todos los días, hasta el fin del mundo.' - Mateo 28:20",
            "'No te desampararé, ni te dejaré.' - Hebreos 13:5",
            "'Cuando mi padre y mi madre me dejaran, con todo, Jehová me recogerá.' - Salmo 27:10",
            "'Y he aquí, yo estoy con vosotros todos los días, hasta el fin del mundo.' - Mateo 28:20",
            "'En la multitud de mis pensamientos dentro de mí, tus consolaciones alegraban mi alma.' - Salmo 94:19",
            "'Los solitarios tienen un lugar en su corazón, pero Jehová les da compañía.' - Salmo 68:6",
            "'Aunque ande en valle de sombra de muerte, no temeré mal alguno; porque tú estarás conmigo.' - Salmo 23:4",
            "'Y no os angustiéis por nada; antes bien, en toda oración y ruego, con acción de gracias, sean dadas a conocer vuestras peticiones delante de Dios.' - Filipenses 4:6",
            "'Y Jehová te guiará siempre; y saciará tu alma en las sequedades, y fortalecerá tus huesos; y serás como un huerto de riego, y como manantial de aguas, cuyas aguas nunca faltan.' - Isaías 58:11",
            "'Ciertamente la amargura se convierte en gozo cuando estamos con el Señor.' - Salmo 30:11",
            "'Él es quien sana a los quebrantados de corazón, y venda sus heridas.' - Salmo 147:3",
            "'El justo tiene cuidado de su ganado; mas las entrañas de los impíos son crueles.' - Proverbios 12:10",
            "'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.' - Salmo 91:1",
            "'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré.' - Isaías 41:10",
            "'En mi angustia invoqué a Jehová, y clamé a mi Dios; él oyó mi voz desde su templo, y mi clamor llegó delante de él.' - Salmo 18:6",
            "'El corazón alegre constituye buen remedio; mas el espíritu triste seca los huesos.' - Proverbios 17:22",
            "'El Señor es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?' - Salmo 27:1",
            "'Bendito el hombre que confía en Jehová, y cuya confianza es Jehová.' - Jeremías 17:7",
            "'El que vive en amor vive en Dios, y Dios en él.' - 1 Juan 4:16",
            "'Todo lo puedo en Cristo que me fortalece.' - Filipenses 4:13",
            "'Tu bondad y tu misericordia me seguirán todos los días de mi vida.' - Salmo 23:6",
            "'He aquí, yo estoy con vosotros todos los días, hasta el fin del mundo.' - Mateo 28:20",
            "'Si un hombre tiene amigos, ha de mostrarse amigo; y hay un amigo más unido que un hermano.' - Proverbios 18:24",
            "'Y en toda angustia que les sobrevino, él también fue angustiado; y el ángel de su presencia los salvó.' - Isaías 63:9",
            "'La esperanza de los justos es alegría; mas la expectativa de los impíos perecerá.' - Proverbios 10:28",
            "'Y no os dejéis llevar de diversas y extrañas doctrinas; porque buena cosa es afirmar el corazón con la gracia.' - Hebreos 13:9",
            "'Los que miran a él son alumbrados, y sus rostros no se avergonzarán.' - Salmo 34:5",
            "'Porque yo sé los planes que tengo para vosotros, dice Jehová, planes de paz, y no de mal, para daros el fin que esperáis.' - Jeremías 29:11",
            "'No te desampares, ni te dejes; oh Dios de mi salvación.' - Salmo 27:9",
            "'Por tanto, os digo: No os afanéis por vuestra vida, qué comeréis o qué beberéis; ni por vuestro cuerpo, qué vestiréis.' - Mateo 6:25",
            "'Los justos claman, y Jehová oye, y los libra de todas sus angustias.' - Salmo 34:17",
            "'El nombre de Jehová es torre fuerte; a él correrá el justo, y será levantado.' - Proverbios 18:10",
            "'Y he aquí, yo estoy con vosotros todos los días, hasta el fin del mundo.' - Mateo 28:20",
            "'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.' - Salmo 91:1",
            "'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.' - Filipenses 4:7",
            "'No os afanéis por nada, sino sean conocidas vuestras peticiones delante de Dios.' - Filipenses 4:6",
            "'En el día que temo, yo en ti confío.' - Salmo 56:3",
            "'Y yo estaré con vosotros todos los días, hasta el fin del mundo.' - Mateo 28:20",
            "'En la multitud de mis pensamientos dentro de mí, tus consolaciones alegraban mi alma.' - Salmo 94:19",
            "'El Señor te guardará de todo mal; él guardará tu alma.' - Salmo 121:7",
            "'En la angustia invocamos a Jehová; y él nos oyó.' - Salmo 120:1",
            "'Los justos claman, y Jehová oye, y los libra de todas sus angustias.' - Salmo 34:17",
            "'Por tanto, no temáis; más valéis vosotros que muchos pajarillos.' - Lucas 12:7",
            "'En la soledad el Señor es nuestro refugio.' - Salmo 46:1"
        ],
        "Triste": [
            "'Bienaventurados los que lloran, porque ellos recibirán consolación.' - Mateo 5:4",
            "'El Señor está cerca de los quebrantados de corazón y salva a los de espíritu abatido.' - Salmo 34:18",
            "'No llores; Dios ha escuchado tu clamor.' - Salmo 56:8",
            "'Las lágrimas son el lenguaje que Dios entiende.' - Salmo 56:8 (parafraseado)'",
            "'Acuérdate de mi en mi angustia.' - Lamentaciones 3:19",
            "'Jehová está cerca de los quebrantados de corazón; y salva a los de espíritu contrito.' - Salmo 34:18",
            "'Echa sobre Jehová tu carga, y él te sustentará; no dejará para siempre caído al justo.' - Salmo 55:22",
            "'El corazón alegre constituye buen remedio; mas el espíritu triste seca los huesos.' - Proverbios 17:22",
            "'Aún en la tristeza, hay esperanza; porque la tristeza puede ser transformada en gozo.' - Salmo 30:5",
            "'El gozo de Jehová es nuestra fuerza.' - Nehemías 8:10",
            "'Pero yo te alabo, Señor, en medio de la angustia.' - Salmo 42:5",
            "'En la multitud de mis pensamientos dentro de mí, tus consolaciones alegraban mi alma.' - Salmo 94:19",
            "'Te he dicho estas cosas para que en mí tengáis paz. En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.' - Juan 16:33",
            "'Los que siembran con lágrimas, con regocijo segarán.' - Salmo 126:5",
            "'En mi angustia invoqué a Jehová, y clamé a mi Dios; él oyó mi voz desde su templo.' - Salmo 18:6",
            "'Así que no desmayamos; antes, aunque este nuestro hombre exterior se va desgastando, el interior no obstante se renueva de día en día.' - 2 Corintios 4:16",
            "'Acuérdate de mí, oh Dios, en tu buena voluntad; y visítame con tu salvación.' - Salmo 106:4'",
            "'No os afanéis por nada, sino sean conocidas vuestras peticiones delante de Dios.' - Filipenses 4:6",
            "'En la noche, mi canción será de ti, y mi oración a ti, Dios mío.' - Salmo 77:6",
            "'Y los que esperaban a Jehová, tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.' - Isaías 40:31",
            "'Si lloras, lloraré contigo; si ríes, reiré contigo.' - Romanos 12:15 (parafraseado)'",
            "'Cuando el justo clama, Jehová oye, y lo libra de todas sus angustias.' - Salmo 34:17",
            "'Él enjugará toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor.' - Apocalipsis 21:4",
            "'No te dejaré, ni te desampararé.' - Hebreos 13:5",
            "'Por eso me acordaré de ti en la tierra del Jordán.' - Salmo 42:6",
            "'Confía en Jehová y haz el bien; habitarás en la tierra, y te alimentarás de la verdad.' - Salmo 37:3",
            "'Dios es nuestro refugio y fortaleza, nuestro pronto auxilio en las tribulaciones.' - Salmo 46:1",
            "'Así que no perdamos la confianza; porque tiene grande galardón la paciencia.' - Hebreos 10:35",
            "'Y los que lloran en Sion, serán consolados.' - Isaías 61:3'",
            "'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.' - Salmo 91:1",
            "'Mira que estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él.' - Apocalipsis 3:20'",
            "'Él lleva nuestras cargas, y en su amor nos consuela.' - Salmo 55:22",
            "'Y si ando en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.' - Salmo 23:4",
            "'La tristeza puede durar toda la noche, pero la alegría viene por la mañana.' - Salmo 30:5'",
            "'Clama a mí, y yo te responderé; y te mostraré cosas grandes y ocultas que tú no conoces.' - Jeremías 33:3'",
            "'El que siembra con lágrimas, con regocijo segará.' - Salmo 126:5'",
            "'Así que, animémonos unos a otros, y edifiquémonos unos a otros.' - 1 Tesalonicenses 5:11",
            "'No permitas que la tristeza te robe la paz; recuerda que el gozo del Señor es tu fortaleza.' - Nehemías 8:10",
            "'El Señor está en medio de ella; no será movida; Dios la ayudará al clarear la mañana.' - Salmo 46:5",
            "'Si el Señor está de tu lado, ¿quién contra ti?' - Romanos 8:31",
            "'La esperanza de los justos es alegría; mas la expectativa de los impíos perecerá.' - Proverbios 10:28",
            "'Así que, en medio de tu tristeza, busca al Señor, que siempre te responderá.' - Salmo 34:17",
            "'Él está cerca de los quebrantados de corazón; y salva a los de espíritu contrito.' - Salmo 34:18",
            "'El Señor está conmigo como un poderoso gigante; por eso mis perseguidos tropezarán y caerán.' - Jeremías 20:11",
            "'El que guarda su boca, guarda su alma; más el que mucho abre los labios, tendrá calamidad.' - Proverbios 13:3",
            "'Y los de corazón triste son sanados por la mano del Señor.' - Salmo 147:3 (parafraseado)'",
            "'Por tanto, alégrense los cielos, y gócese la tierra.' - Apocalipsis 12:12",
            "'No se turbe vuestro corazón; creed en Dios, creed también en mí.' - Juan 14:1",
            "'Mira, no estás sola, yo estoy contigo; no temas, porque yo soy tu Dios.' - Isaías 41:10",
            "'Y en su presencia hay plenitud de gozo; delicias a su diestra para siempre.' - Salmo 16:11",
            "'El amor es paciente, es bondadoso. El amor no tiene celos, no es jactancioso, no se envanece.' - 1 Corintios 13:4",
            "'Si no puedo volar, entonces correré; si no puedo correr, entonces caminaré; pero sea lo que sea, seguiré adelante.' - Isaías 40:31 (parafraseado)'",
            "'Y aunque pase por el valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.' - Salmo 23:4"
        ]
    };

    emotionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const emotion = button.querySelector('p').innerText;
            showModal(emotion);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    copyButton.addEventListener('click', () => {
        const textToCopy = modalVerse.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Versículo copiado al portapapeles');
        });
    });

    function showModal(emotion) {
        modal.style.display = 'flex';
        modalVerse.innerText = getRandomVerseForEmotion(emotion);
    }

    function getRandomVerseForEmotion(emotion) {
        const emotionVerses = verses[emotion];
        if (emotionVerses && emotionVerses.length > 0) {
            const randomIndex = Math.floor(Math.random() * emotionVerses.length);
            return emotionVerses[randomIndex];
        }
        return "Versículo relacionado no encontrado.";
    }

    // Función para agregar nuevos versículos (puedes implementar tu lógica)
    function addVerse(emotion, verse) {
        if (verses[emotion]) {
            verses[emotion].push(verse);
        } else {
            verses[emotion] = [verse];
        }
    }

    // Ejemplo de cómo agregar un nuevo versículo (puedes usar un formulario para esto)
    // addVerse("Feliz", "'Todo lo puedo en Cristo que me fortalece.' - Filipenses 4:13");
};
const letterImage = document.getElementById('letterImage');
    const letterModal = document.getElementById('letterModal');
    const closeLetter = document.querySelector('.close-letter');

    // Función para abrir el modal
    letterImage.addEventListener('click', () => {
        letterModal.style.display = 'flex'; // Mostrar el modal
    });

    // Función para cerrar el modal
    closeLetter.addEventListener('click', () => {
        letterModal.style.display = 'none'; // Ocultar el modal
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === letterModal) {
            letterModal.style.display = 'none'; // Ocultar el modal
        }
    });


