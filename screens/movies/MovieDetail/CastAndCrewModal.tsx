import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { FormatCreditType } from "../../../utils/helpers/formatCredit";
import { Cast, Crew } from "../../../types/Credits.type";
import { colors } from "../../../theme/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/config";

interface CastAndCrewModalProps {
  isVisible: boolean;
  onClose: () => void;
  data: FormatCreditType;
}
export default function CastAndCrewModal({
  isVisible,
  onClose,
  data,
}: CastAndCrewModalProps) {
  const globalConfig = useSelector((state: RootState) => state.global.config);
  const { width } = useWindowDimensions();
  const { castByDepartment, crewByDepartment } = data;
  const castKeys: string[] = [];
  const crewKeys: string[] = [];
  castByDepartment.forEach((value, key, map) => {
    castKeys.push(key);
  });

  crewByDepartment.forEach((value, key, map) => {
    crewKeys.push(key);
  });
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Pressable
          style={{
            height: 50,
            position: "absolute",
            bottom: 10,
            backgroundColor: colors.violet,
            width: 50,
            zIndex: 999,
            alignItems: "center",
            justifyContent: "center",
            left: width / 2.3,
            borderRadius: 25,
            elevation: 5,
          }}
          onPress={onClose}
        >
          <Text
            style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}
          >
            X
          </Text>
        </Pressable>
        <ScrollView>
          <View>
            {castKeys &&
              castKeys.map((k) => (
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      backgroundColor: colors.violet,
                      color: colors.white,
                      padding: 8,
                    }}
                  >
                    {k}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 16,
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    {castByDepartment.get(k).map((cast: Cast) => {
                      const profileUrl = `${globalConfig.images.base_url}/w45/${cast.profile_path}`;

                      return (
                        <View
                          style={{
                            width: width / 2 - 8,
                            alignItems: "center",
                            // borderWidth: 1,
                            borderBottomWidth: 5,
                            borderBottomColor: colors.orange,
                            elevation: 5,
                            backgroundColor: "#fff",
                            paddingVertical: 8,
                          }}
                        >
                          <Image
                            source={{ uri: profileUrl }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 25,
                              resizeMode: "contain",
                            }}
                          />
                          <Text
                            style={{
                              color: colors.violet,
                              fontWeight: "bold",
                              fontSize: 18,
                            }}
                          >
                            {cast.name}
                          </Text>
                          <Text numberOfLines={1}>{cast.character}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}

            {crewKeys &&
              crewKeys.map((k) => (
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      backgroundColor: colors.violet,
                      color: colors.white,
                      padding: 8,
                    }}
                  >
                    {k}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 16,
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    {crewByDepartment.get(k).map((crew: Crew) => {
                      const profileUrl = `${globalConfig.images.base_url}/w45/${crew.profile_path}`;

                      return (
                        <View
                          style={{
                            width: width / 2 - 8,
                            alignItems: "center",
                            // borderWidth: 1,
                            borderBottomWidth: 5,
                            borderBottomColor: colors.orange,
                            elevation: 5,
                            backgroundColor: "#fff",
                            paddingVertical: 8,
                          }}
                        >
                          <Image
                            source={{ uri: profileUrl }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 25,
                              resizeMode: "contain",
                            }}
                          />
                          <Text
                            style={{
                              color: colors.violet,
                              fontWeight: "bold",
                              fontSize: 18,
                            }}
                          >
                            {crew.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
