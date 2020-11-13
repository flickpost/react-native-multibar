import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, TouchableOpacity, View,Dimensions,Platform,ImageBackground} from 'react-native';
import {Colors} from '../utils';
const MultiBar = ({style, navigation, 
    activeTintColor, inactiveTintColor, renderIcon, jumpTo}) => 
{
    
   
    const {
        index,
        routes
    } = navigation.state;

    return (
        <ImageBackground source={require('../../../../app/images/bg/bottommenu.png')} 
            style={Styles.container}>
            <SafeAreaView
                pointerEvents="box-none"
                //style={Styles.container}
                forceInset={{
                    top: 'never',
                    bottom: 'always',
                }}
                >
                <SafeAreaView
                    style={[Styles.fakeBackground, style]}
                    forceInset={{
                        top: 'never',
                        bottom: 'always',
                    }}
                >
                    <View style={{height: 49}}/>
                </SafeAreaView>
                    <View
                        pointerEvents="box-none"
                        style={Styles.content}>
                        {
                            routes.map((route, idx) => {
                                const focused = index === idx;

                                if (!route.params || !route.params.navigationDisabled) {
                                    return (
                                        <TabIcon
                                            key={route.key}
                                            route={route}
                                            renderIcon={renderIcon}
                                            focused={focused}
                                            activeTintColor={activeTintColor}
                                            inactiveTintColor={inactiveTintColor}
                                            onPress={() => 
                                            navigation.navigate(route.key)
                                                
                                            }
                                        />
                                    );
                                }
                                const Icon = renderIcon({
                                    route,
                                    focused,
                                    tintColor: focused
                                        ? activeTintColor
                                        : inactiveTintColor
                                });

                                return {
                                    ...Icon,
                                    key: 'simple'
                                };
                            })
                            
                        }
                    </View>
            </SafeAreaView>
        </ImageBackground>
        
    );
};

MultiBar.propTypes = {
    style: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    renderIcon: PropTypes.func.isRequired,
    //jumpTo: PropTypes.func.isRequired,
    activeTintColor: PropTypes.string,
    inactiveTintColor: PropTypes.string,
};

MultiBar.defaultProps = {
    activeTintColor: Colors.activeTintColor,
    inactiveTintColor: Colors.inactiveTintColor
};

const TabIcon = ({route, renderIcon, focused, activeTintColor, inactiveTintColor, onPress}) => (
   
   <TouchableOpacity
        style={Styles.tabStyle}
        onPress={() => onPress && onPress()}
    >
        {
            renderIcon({
                route,
                focused,
                tintColor: focused
                    ? activeTintColor
                    : inactiveTintColor
            })
        }
    </TouchableOpacity>
   
);

TabIcon.propTypes = {
    route: PropTypes.object.isRequired,
    renderIcon: PropTypes.func.isRequired,
    activeTintColor: PropTypes.string.isRequired,
    inactiveTintColor: PropTypes.string.isRequired,
    focused: PropTypes.bool,
    onPress: PropTypes.func
};

TabIcon.defaultProps = {
    focused: false
};

const Styles = {
    container: {
        elevation:3,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        minHeight: 65,
       
    },
    fakeBackground: {
        position: 'absolute',
        width: '100%',
        
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255,0)",
        //elevation: 5,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        marginTop:15
       
    },
    tabStyle: {
        height: 50,
        width: Dimensions.get('window').width/5,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'#000'
        
    },
    
};

export {MultiBar};