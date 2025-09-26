import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyArticlesScreen() {
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from AsyncStorage
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const storedArticles = await AsyncStorage.getItem("customArticles");
        if (storedArticles) {
          setArticles(JSON.parse(storedArticles));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Navigate to NewsFormScreen to add a new article
  const handleAddArticle = () => {
    navigation.navigate("NewsFormScreen");
  };

  // Navigate to CustomNewsScreen to view article details
  const handleArticleClick = (article) => {
    navigation.navigate("CustomNewsScreen", { article });
  };

  // Delete article from AsyncStorage and update state
  const deleteArticle = async (index) => {
    try {
      const updatedArticles = [...articles];
      updatedArticles.splice(index, 1);
      await AsyncStorage.setItem(
        "customArticles",
        JSON.stringify(updatedArticles)
      );
      setArticles(updatedArticles);
    } catch (error) {
      console.error("Error deleting the article:", error);
    }
  };

  // Navigate to NewsFormScreen to edit an existing article
  const editArticle = (article, index) => {
    navigation.navigate("NewsFormScreen", {
      articleToEdit: article,
      articleIndex: index,
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{"Back"}</Text>
      </TouchableOpacity>

      {/* Add New Article Button */}
      <TouchableOpacity onPress={handleAddArticle} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Article</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {articles.length === 0 ? (
            <Text style={styles.noArticlesText}>No articles added yet.</Text>
          ) : (
            articles.map((article, index) => (
              <View key={index} style={styles.articleCard} testID="articleCard">
                <TouchableOpacity
                  testID="handleArticleBtn"
                  onPress={() => handleArticleClick(article)}
                >
                  {article.image && (
                    <Image
                      source={{ uri: article.image }}
                      style={styles.articleImage}
                    />
                  )}
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text
                    style={styles.articleDescription}
                    testID="articleDescp"
                  >
                    {article.description?.substring(0, 50) + "..."}
                  </Text>
                </TouchableOpacity>

                {/* Edit and Delete Buttons */}
                <View
                  style={styles.actionButtonsContainer}
                  testID="editDeleteButtons"
                >
                  <TouchableOpacity
                    onPress={() => editArticle(article, index)}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteArticle(index)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#F9FAFB",
  },
  backButton: {
    marginBottom: hp(1.5),
  },
  backButtonText: {
    fontSize: hp(2.2),
    color: "#4F75FF",
  },
  addButton: {
    backgroundColor: "#4F75FF",
    padding: wp(0.7),
    alignItems: "center",
    borderRadius: 5,
    width: 300,
    marginLeft: 500,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2.2),
  },
  scrollContainer: {
    paddingBottom: hp(2),
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  noArticlesText: {
    textAlign: "center",
    fontSize: hp(2),
    color: "#6B7280",
    marginTop: hp(5),
  },
  articleCard: {
    width: 400,
    height: 300,
    backgroundColor: "#fff",
    padding: wp(3),
    borderRadius: 8,
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  articleImage: {
    width: 300,
    height: 150,
    borderRadius: 8,
    marginBottom: hp(1),
  },
  articleTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#111827",
    marginBottom: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(1.5),
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  editButton: {
    backgroundColor: "#34D399",
    padding: wp(0.5),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    padding: wp(0.5),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
});
