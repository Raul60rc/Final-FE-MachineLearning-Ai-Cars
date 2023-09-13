import pyttsx3
import speech_recognition as sr
from gtts import gTTS
import os
import pywhatkit
import yfinance as yf
import pyjokes
import webbrowser
import datetime
import wikipedia
import re

# Escuchar nuestro micrófono y devolver el audio como texto
def transf_audio_en_texto():
    r = sr.Recognizer()
    with sr.Microphone() as origen:
        r.pause_threshold = 0.8
        print("Ya puedes hablar ")
        audio = r.listen(origen)

        try:
            pedido = r.recognize_google(audio, language="es-es")
            print("Dijiste: " + pedido)
            return pedido.lower()

        except sr.UnknownValueError:
            print("Ups, no se pudo reconocer el audio")
            return "Sigo esperando"

        except sr.RequestError:
            print("Ups, ocurrió un error al procesar la solicitud de reconocimiento de voz")
            return "Sigo esperando"

        except Exception as e:
            print("Ups, ocurrió un error inesperado:", str(e))
            return "Sigo esperando"


# Función para que el asistente pueda ser escuchado
def hablar(mensaje):
    tts = gTTS(text=mensaje, lang='es')
    tts.save('salida.mp3')
    os.system('afplay salida.mp3')


#Informar el día de la semana
def pedir_dia():


    #Crear variables con datos de hoy
    dia = datetime.datetime.today()
    print(dia)


    #Crear variable para el día de la semana
    dia_semana = dia.weekday()
    print(dia_semana)

    #Diccionario con nombres de días
    calendario = {0: 'lunes',
                  1: 'Martes',
                  2: 'Miercoles',
                  3: 'Jueves',
                  4: 'Viernes',
                  5: 'Sábado',
                  6: 'Domingo'}

    #decir el día de la semana
    hablar(f'Hoy es{calendario[dia_semana]} ')


def pedir_hora():

    # Crear variable con datos de la hora
    hora_actual = datetime.datetime.now()
    print(hora_actual)

    # Formatear la hora como una cadena de texto
    hora_formateada = hora_actual.strftime("%H:%M:%S")

    # Decir la hora
    hablar("La hora actual es " + hora_formateada)


#Funcion de saludo inicial
def saludo_inicial():


    #Variable con datos de hora
    hora = datetime.datetime.now()
    if hora.hour < 6 or hora.hour > 20:
        momento = 'Buenas noches'

    elif hora.hour >= 6 and hora.hour < 13:
        momento = 'Buen día'

    else:
        momento = 'Buenas tardes'

    #Decir el saludo
    hablar(f'{momento}, soy tu assistente personal, por favor, dime en qué te puedo ayudar')


#Funcion central del asistente
import re

def pedir_cosas():
    saludo_inicial()
    comenzar = True

    while comenzar:
        pedido = transf_audio_en_texto()

        if re.search(r'\babre youtube\b', pedido):
            hablar("Con gusto, estoy abriendo YouTube")
            webbrowser.open('https://www.youtube.com')
            continue

        elif re.search(r'\babrir navegador\b', pedido):
            hablar("Claro, estoy abriendo el navegador")
            webbrowser.open('https://www.google.com')
            continue

        elif re.search(r'\bhora\b', pedido):
            pedir_hora()
            continue

        elif re.search(r'\bsalir\b', pedido):
            hablar("Hasta luego")
            comenzar = False
            break
            

        elif re.search(r'\bqué día es hoy\b', pedido):
            pedir_dia()
            continue

        elif re.search(r'\bqué hora es\b', pedido):
            pedir_hora()
            continue



        elif re.search(r'\bbusca en wikipedia\b', pedido):

            hablar("Claro , lo busco en wikipedia")
            pedido= pedido.replace('wikipedia', '')
            wikipedia.set_lang('es')
            resultado = wikipedia.summary(pedido, sentences=1)
            hablar('wikipedia dice lo siguiente: ')
            hablar(resultado)
            continue

        elif re.search(r'\bbusca en internet\b',  pedido):
            hablar('estoy en ello')
            pedido = pedido.replace('busca en internet ', '')
            hablar('Esto es lo que he encontrado')
            continue

        elif re.search(r'\breproduce\b', pedido):
            hablar('Ya comienzo a reproducirlo')
            pywhatkit.playonyt(pedido)
            continue

        elif 'broma' in pedido:
            hablar(pyjokes.get_joke('es'))
            continue

        elif re.search(r'\bprecio de las acciones\b' , pedido):
            accion = pedido.split('de')[-1].strip()
            cartera = {'apple': 'APPL',
                       'amazon':'AMZN',
                       'google':'GOOGL'}

            try:
                accion_buscada = cartera[accion]
                accion_buscada = yf.Ticker(accion_buscada)
                precio_actual = accion_buscada.info['regularMarketPrice']
                hablar(f'La encontré el precio de {accion} es {precio_actual}')
                continue
            except:
                hablar('Perdon pero no la he encontrado')
                continue

        elif re.search(r'\badiós\b'  , pedido):
            hablar('Cualquier cosa , avísame')
            break






pedir_cosas()


pedir_cosas()



saludo_inicial()
#pedir_hora()

#pedir_dia()

#hablar("")


