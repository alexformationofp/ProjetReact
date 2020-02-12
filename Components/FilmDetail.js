import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayFilm() {
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          
          <Image 
            style={styles.image}
            source={{ uri: getImageFromApi(this.state.film.backdrop_path)}}
            />
          <Text style={styles.titre}>{this.state.film.title}</Text>
          <Text style={styles.description}>{this.state.film.overview}</Text>
          <Text style={styles.detail}>Sorti le {this.state.film.release_date}</Text>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
      height: 200,
  },
  titre: {
      textAlign: "center",
      fontWeight: "700",
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10
  },
  description: {
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: "justify"
  },
  detail: {
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: "700"
  }
})

export default FilmDetail