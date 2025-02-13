import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faParking, 
    faArrowRight, 
    faLocationDot,
    faChevronDown,
    faChevronUp,
    faCircleInfo,
    faXmark 
} from '@fortawesome/free-solid-svg-icons';
import colors from "../constants/colors";
import Card from "../Components/Card";
import LinearGradient from 'react-native-linear-gradient';

const OpisParkingaScreen = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const navigation = useNavigation();
    
    useFocusEffect(
        React.useCallback(() => {
            setSelectedFilter('all');
            setShowFilters(false);
        }, [])
    );

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    const getPinColor = (lokacija) => {
        const lokacijaBroj = parseInt(lokacija);
        if (lokacijaBroj === 1) return '#082ea8'; 
        if (lokacijaBroj >= 2 && lokacijaBroj <= 7) return '#FF0000'; 
        if (lokacijaBroj >= 8) return '#4CAF50'; 
        return colors.primary;
    };

    const FilterButton = ({ color, filter }) => (
        <TouchableOpacity 
            style={[
                styles.filterButton, 
                selectedFilter === filter && { 
                    backgroundColor: '#f5f5f5',
                    elevation: 3,
                }
            ]}
            onPress={() => {
                setSelectedFilter(filter);
                setShowFilters(false);
            }}
        >
            <FontAwesomeIcon 
                icon={faLocationDot} 
                size={24} 
                color={color}
            />
        </TouchableOpacity>
    );

    const shouldShowParking = (lokacija) => {
        const lokacijaBroj = parseInt(lokacija);
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'smart' && lokacijaBroj === 1) return true;
        if (selectedFilter === 'tourist' && lokacijaBroj >= 2 && lokacijaBroj <= 7) return true;
        if (selectedFilter === 'transit' && lokacijaBroj >= 8) return true;
        return false;
    };

    const ParkingCard = ({ lokacija, naziv, onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faParking} size={24} color={colors.primary} />
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.locationRow}>
                            <Text style={styles.lokacijaText}>PARKING LOKACIJA {lokacija}</Text>
                            <FontAwesomeIcon 
                                icon={faLocationDot} 
                                size={16} 
                                color={getPinColor(lokacija)}
                                style={styles.pinIcon}
                            />
                        </View>
                        <Text style={styles.nazivText}>{naziv}</Text>
                    </View>
                    <FontAwesomeIcon icon={faArrowRight} size={20} color={colors.primary} />
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.screen}>
                    <Text style={styles.headerText}>Parking lokacije</Text>
                    
                    <View style={styles.controlsContainer}>
                        <View style={styles.infoButtonContainer} />
                        <TouchableOpacity 
                            style={styles.mainFilterButton}
                            onPress={() => setShowFilters(!showFilters)}
                        >
                            <FontAwesomeIcon 
                                icon={faLocationDot} 
                                size={24} 
                                color={
                                    selectedFilter === 'smart' ? '#082ea8' :
                                    selectedFilter === 'tourist' ? '#FF0000' :
                                    selectedFilter === 'transit' ? '#4CAF50' :
                                    colors.primary
                                }
                            />
                            <FontAwesomeIcon 
                                icon={showFilters ? faChevronUp : faChevronDown} 
                                size={16} 
                                color={colors.primary} 
                            />
                        </TouchableOpacity>
                        <View style={styles.infoButtonContainer}>
                            <TouchableOpacity 
                                style={styles.infoButton}
                                onPress={() => setShowInfoModal(true)}
                            >
                                <FontAwesomeIcon icon={faCircleInfo} size={24} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Modal
                        transparent={true}
                        visible={showInfoModal}
                        animationType="fade"
                        onRequestClose={() => setShowInfoModal(false)}
                    >
                        <TouchableOpacity 
                            style={styles.modalOverlay}
                            activeOpacity={1}
                            onPress={() => setShowInfoModal(false)}
                        >
                            <View style={styles.modalContent}>
                                <TouchableOpacity 
                                    style={styles.closeButton}
                                    onPress={() => setShowInfoModal(false)}
                                >
                                    <FontAwesomeIcon icon={faXmark} size={24} color="#666" />
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Legenda parkinga</Text>
                                <View style={styles.legendItem}>
                                    <FontAwesomeIcon icon={faLocationDot} size={20} color="#082ea8" />
                                    <Text style={styles.legendText}>Pametni parking</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <FontAwesomeIcon icon={faLocationDot} size={20} color="#FF0000" />
                                    <Text style={styles.legendText}>Parking za turiste</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <FontAwesomeIcon icon={faLocationDot} size={20} color="#4CAF50" />
                                    <Text style={styles.legendText}>Parking u prolazu</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    
                    {showFilters && (
                        <View style={styles.filtersDropdown}>
                            <FilterButton 
                                color={colors.primary}
                                filter="all"
                            />
                            <FilterButton 
                                color="#082ea8"
                                filter="smart"
                            />
                            <FilterButton 
                                color="#FF0000"
                                filter="tourist"
                            />
                            <FilterButton 
                                color="#4CAF50"
                                filter="transit"
                            />
                        </View>
                    )}
                    
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lokacija => 
                        shouldShowParking(lokacija.toString()) && (
                            <ParkingCard 
                                key={lokacija}
                                lokacija={lokacija.toString()}
                                naziv={lokacija === 1 ? "Parking kod policijske stanice" :
                                      lokacija === 2 ? "Parking kod doma zdravlja" :
                                      lokacija === 3 ? "Parking kod sportskog centra" :
                                      lokacija === 4 ? "Parking kod motela" :
                                      lokacija === 5 ? "Parking centar" :
                                      lokacija === 6 ? "Parking kod opštine" :
                                      lokacija === 7 ? "Parking kod marketa" :
                                      lokacija === 8 ? "Parking za kamione" :
                                      lokacija === 9 ? "Parking kod pumpe" :
                                      ""
                                    }
                                onPress={() => navigateToScreen(`LOKACIJA${lokacija}`)}
                            />
                        )
                    )}
                </View>
            </ScrollView>
            <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
                style={styles.bottomFade}
            />
            <View style={styles.bottomSpacing} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pozadina,
    },
    scrollView: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 120,
    },
    screen: {
        padding: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
        textAlign: 'center',
        width: '100%',
    },
    cardWrapper: {
        width: '100%',
        marginBottom: 25,
    },
    card: {
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.pozadina,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        marginRight: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    lokacijaText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary,
        marginRight: 6,
    },
    pinIcon: {
        marginTop: 2,
    },
    nazivText: {
        fontSize: 16,
        color: '#082ea8',
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 15,
    },
    infoButtonContainer: {
        width: 40,
    },
    mainFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: colors.primary,
        gap: 10,
        elevation: 0,
    },
    infoButton: {
        padding: 8,
    },
    filtersDropdown: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        elevation: 5,
        gap: 15,
        marginBottom: 15,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        elevation: 0,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        paddingTop: 30,
        width: '80%',
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 8,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 15,
        textAlign: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    legendText: {
        fontSize: 16,
        color: '#333',
    },
    bottomFade: {
        position: 'absolute',
        bottom: 110,
        left: 0,
        right: 0,
        height: 30,
        zIndex: 1,
    },
    bottomSpacing: {
        height: 110,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.pozadina,
        zIndex: 1,
    },
});

export default OpisParkingaScreen;