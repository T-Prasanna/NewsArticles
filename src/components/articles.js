import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Articles({ categories, articles }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="title">
        Latest News
      </Text>
      <View testID="articlesDisplay">
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()} // or item.idArticle if your API uses that
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View style={styles.cardWrapper} testID="articleDisplay">
      <TouchableOpacity
        onPress={() => navigation.navigate("ArticleDetail", { ...item })}
        activeOpacity={0.7}
      >
        {/* Thumbnail */}
        <Image
          source={{ uri: item.thumbnail }}
          style={[
            styles.articleImage,
            { height: index % 3 === 0 ? hp(25) : hp(35) }, // dynamic height
          ]}
        />

        {/* Title */}
        <Text style={styles.articleText}>
          {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
        </Text>

        {/* Description */}
        <Text style={styles.articleDescription}>
          {item.description.length > 40
            ? item.description.slice(0, 40) + "..."
            : item.description}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#52525B",
    marginBottom: hp(1.5),
  },
  cardWrapper: {
    flex: 1,
    margin: wp(1.5),
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: wp(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  articleImage: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  articleText: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: "#333",
    marginTop: hp(0.8),
  },
  articleDescription: {
    fontSize: hp(1.5),
    color: "#6B7280",
    marginTop: hp(0.3),
  },
});
