import { View, Text, Button, FlatList, SectionList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pokemon from '../components/pokemon'
import { API_URL } from '../../constants'
import { useTheme } from '../../providers/theme_provider'
import { colors, themeColors, typeColors } from '../../themes/colors'
import { myTheme } from '../../themes/myTheme'
import { SafeAreaView } from 'react-native-safe-area-context'
import TypeHeader from '../components/type_header'

const IndexScreen = () => {
    
    const { theme } = useTheme();

    const [loading, setLoading] = useState(false)
    const [pokemons, setPokemons] = useState([])
    
    const pokemonByGroups = [];
    
    const getPokemon = async() => {
        const { data } = await axios.get(`${API_URL}/pokemon`)
        
        data.forEach((value, key) => {
            const types = value.type.join(" - ")
            const group =  pokemonByGroups.find((value) => value.type == types)
            if(group == null) {
                pokemonByGroups.push({
                    type: types,
                    data: [ value ]
                })
            } else if(group.data.findIndex(data => data.id == value.id) < 0){
                group.data.push(value)
            }
        });  
         
        setPokemons(pokemonByGroups)
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        getPokemon();
    }, [])

    const themeColor = themeColors[theme];

    if(loading) {
        return (
        <View style={[myTheme.centerInContainer, { backgroundColor: themeColor.container}]}>
            <ActivityIndicator color={colors.red_500}/>
       </View>
       )
    } 

    //typeColors[type.toLowerCase().replaceAll(" ", "")].bg

    return (
        <SafeAreaView>
            <SectionList 
                style={{ backgroundColor: themeColor.container}}
                sections={pokemons}  
                renderSectionHeader={({ section: {type}}) => <TypeHeader type={type}/>} 
                renderItem={({ item }) => <Pokemon  pokemon={item} />}  
            />
        </SafeAreaView>
    )
}

export default IndexScreen