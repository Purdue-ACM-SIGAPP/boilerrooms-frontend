import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, sizes } from "../theme";

const STAR_COUNT = 5;

/**
 * Shows a 1–10 rating as five stars (half-star precision).
 * Pass `onChange` to make it editable: the left/right half of each star selects an odd/even value.
 */
export default function StarRating({ rating = 0, onChange, size = sizes.iconMd, style }) {
  const stars = (rating ?? 0) / 2;

  return (
    <View style={[styles.row, style]} accessibilityLabel={`Rated ${stars} out of ${STAR_COUNT} stars`}>
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        const position = index + 1;
        const icon = stars >= position ? "star" : stars >= position - 0.5 ? "star-half-full" : "star-outline";
        return (
          <View key={position}>
            <MaterialCommunityIcons name={icon} size={size} color={colors.star} />
            {onChange ? (
              <View style={styles.hitAreas}>
                <Pressable
                  style={styles.half}
                  accessibilityLabel={`${position - 0.5} stars`}
                  onPress={() => onChange(position * 2 - 1)}
                />
                <Pressable
                  style={styles.half}
                  accessibilityLabel={`${position} stars`}
                  onPress={() => onChange(position * 2)}
                />
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  hitAreas: { ...StyleSheet.absoluteFillObject, flexDirection: "row" },
  half: { flex: 1 },
});
