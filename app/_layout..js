import { Stack } from 'expo-router'
import { colors, themeColors } from './themes/colors'
import { ThemeContextProvider } from './providers/theme_provider'
import { FavouriteContextProvider } from './providers/fav_provider'

const AppLayout = () => {
  return (
    <ThemeContextProvider>
        <FavouriteContextProvider>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={
                        {
                            headerShown: false
                        }
                    }
                />
                <Stack.Screen
                    name='pokedex/(tabs)'  
                    options={
                        {
                            headerShown: false,
                        }
                    } 
                />
                <Stack.Screen
                    name='pokedex/[id]'
                    options={
                        {
                            title: 'View Pokemon',
                           headerShown: false,
                        }
                    } 
                />
            </Stack>
        </FavouriteContextProvider>
    </ThemeContextProvider>
  )
}

export default AppLayout