import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import MiniBlog from './Miniblog';
import {View} from 'react-native-animatable';

const PostScreen = ({navigation}: {navigation: any}) => {
  const blogs = [
    {
      id: 1,
      title: 'Diabetes',
      content:
        '¿Qué es la diabetes? La diabetes, también conocida como diabetes mellitus, es una enfermedad en la que los niveles de glucosa (o azúcar) en sangre son demasiado altos. La glucosa es la principal fuente de energía del cuerpo. \n\n' +
        'Su cuerpo puede producir glucosa, pero también proviene de los alimentos que consume. La insulina es una hormona producida por el páncreas. La insulina ayuda a trasladar la glucosa del torrente sanguíneo a las células, donde se puede usar como energía.Si tiene diabetes, su cuerpo no puede producir insulina, no puede usarla como debería; o ambas cosas a la vez. \n\n' +
        'Demasiada glucosa permanece en la sangre y no llega a las células. Esto puede hacer que los niveles de glucosa suban demasiado. Con el tiempo, niveles altos de glucosa en sangre pueden provocar problemas de salud graves. Pero usted puede tomar medidas para controlar la diabetes e intentar prevenir estas afecciones médicas.\n\n' +
        '¿Cuáles son los tipos de diabetes?\n\n ' +
        'Existen diferentes tipos de diabetes:\n\n' +
        '* Diabetes tipo 1: Si tiene diabetes tipo, su cuerpo produce poca o nada de insulina. Ocurre cuando el sistema inmunitario ataca y destruye las células que producen insulina \n\n' +
        '* Diabetes tipo 2: Es la forma más común de diabetes. Si tiene diabetes tipo 2, su cuerpo puede seguir produciendo insulina, pero sus células no responden bien a ella y no pueden absorber fácilmente suficiente glucosa de la sangre \n\n' +
        '* Diabetes gestacional: Es un tipo de diabetes que se desarrolla durante el embarazo. Se produce cuando el cuerpo no puede producir la insulina adicional necesaria durante la gestación',
      footer:
        'Diabetes. (2002). Diabetes Mellitus. https://medlineplus.gov/spanish/diabetes.html',
      image: require('../assets/icons/diabetes.jpeg'),
    },
    {
      id: 2,
      title: '6 Recomendaciones Para Las Personas Con Asma',
      content:
        'El asma es una enfermedad que en varios casos limita mucho a los pacientes. Sin embargo, es importante siempre tener en cuenta qué cosas hacer y qué cosas pueden ayudar a mejorar tu día a día a las personas que padecen esta enfermedad. Es por esa razón que te compartimos seis recomendaciones que te ayudarán a poder llevar una vida con normalidad, a pesar que sufras de asma.',
      footer:
        '6 recomendaciones para las personas con asma. (s/f). Myrgroup.pe. Recuperado el 6 de noviembre de 2024, de https://www.myrgroup.pe/blog/6-recomendaciones-para-las-personas-con-asma-34',
      image: require('../assets/icons/asma.jpeg'),
    },
    {
      id: 3,
      title: 'Hipertensión',
      content:
        'La hipertensión arterial es una enfermedad crónica en la que aumenta la presión con la que el corazón bombea sangre a las arterias, para que circule por todo el cuerpo.El sobrepeso y la obesidad  pueden aumentar la presión arterial, sube los niveles de glucosa en la sangre, colesterol, triglicéridos y ácido úrico, lo que dificulta que la sangre fluya por el organismo.',
      footer:
        'Hipertensión Arterial. (s/f). Gob.mx. Recuperado el 6 de noviembre de 2024, de https://www.imss.gob.mx/salud-en-linea/hipertension-arterial',
      image: require('../assets/icons/hipertension.jpeg'),
    },
    {
      id: 4,
      title: 'La Gripe',
      content:
        'La gripe (influenza) es una infección viral respiratoria que causa fiebre, escalofríos, secreción nasal, dolor del cuerpo y tos. Se propaga fácilmente de persona a persona. La gripe puede causar síntomas de moderados a graves.',
      footer:
        'Gripe. (s/f). Medlineplus.gov. Recuperado el 6 de noviembre de 2024, de https://medlineplus.gov/spanish/ency/article/000080.htm',
      image: require('../assets/icons/gripe.jpeg'),
    },
    {
      id: 5,
      title: 'La Fiebre',
      content:
        'La fiebre es una parte importante de las defensas del cuerpo contra la infección. La mayoría de las bacterias y virus que causan las infecciones en las personas prosperan mejor a 98.6°F (37°C). Muchos bebés y niños presentan fiebre alta con enfermedades virales menores. Aunque la fiebre sea para nosotros un signo de que se podría estar presentando una batalla en el cuerpo, dicha fiebre está luchando a favor de la persona y no en su contra..',
      footer:
        'Fiebre. (s/f). Medlineplus.gov. Recuperado el 6 de noviembre de 2024, de https://medlineplus.gov/spanish/ency/article/003090.htm',
      image: require('../assets/icons/fiebre.jpeg'),
    },
  ];

  const handleBlogPress = (blog: any) => {
    navigation.navigate('BlogDetailScreen', {blog});
  };

  return (
    <View style={styles.containerAll}>
      <Text style={styles.headerText}>BLOGS</Text>
      <View style={styles.divider} />
      <ScrollView style={styles.container}>
        {blogs.map(blog => (
          <MiniBlog
            key={blog.id}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            onPress={() => handleBlogPress(blog)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  headerText: {
    height: 50,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 0,
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'white',
  },
  containerAll: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  divider: {
    height: 1, // Altura de la línea
    backgroundColor: 'black', // Color de la línea
    marginVertical: 8, // Espacio alrededor de la línea
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
});

export default PostScreen;
