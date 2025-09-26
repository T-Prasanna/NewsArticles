import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Get favorite articles from Redux
  const favoriteArticlesList = useSelector(
    (state) => state.favorites.favoriteArticles
  ) || [];

  return (
    <View style={styles.container}>
      {favoriteArticlesList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite articles yet!</Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}
          >
            <Text style={styles.goBackButtonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>My Favorite Articles</Text>

          {/* Go Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}
          >
            <Text style={styles.goBackButtonText}>Go back</Text>
          </TouchableOpacity>

          {/* List of favorite articles */}
          <FlatList
            data={favoriteArticlesList}
            contentContainerStyle={styles.listContentContainer}
            keyExtractor={(item) => item.idArticle}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate("ArticleDetail", item)}
              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.articleImage}
                />
                <Text style={styles.articleTitle}>
                  {item.title.length > 20
                    ? `${item.title.slice(0, 20)}...`
                    : item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#4B5563",
  },
  goBackButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    alignItems: "center",
    marginLeft: 20,
  },
  goBackButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    color: "#4B5563",
  },
  listContentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  articleImage: {
    width: "100%",
    height: 150,
  },
  articleTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
  },
});
