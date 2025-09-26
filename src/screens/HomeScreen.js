import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Categories from "../components/categories";
import Articles from "../components/articles";

const HomeScreen = () => {
  // State for active category
  const [activeCategory, setActiveCategory] = useState("Technology");

  // Categories data
  const [categories] = useState([
    {
      id: 1,
      strCategory: "Technology",
      strCategoryThumb:
        "https://cdn-icons-png.flaticon.com/512/4149/4149670.png",
    },
    {
      id: 2,
      strCategory: "Sports",
      strCategoryThumb:
        "https://cdn-icons-png.flaticon.com/512/3082/3082031.png",
    },
    {
      id: 3,
      strCategory: "Business",
      strCategoryThumb:
        "https://cdn-icons-png.flaticon.com/512/3135/3135673.png",
    },
    {
      id: 4,
      strCategory: "Health",
      strCategoryThumb:
        "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
    },
  ]);

  // Articles data
  const [allArticles] = useState([
    {
      id: 101,
      title: "AI is Changing the World",
      description:
        "Artificial Intelligence is revolutionizing industries across the globe.",
      thumbnail:
        "https://cdn-icons-png.flaticon.com/512/4712/4712009.png",
      category: "Technology",
    },
    {
      id: 102,
      title: "Football Championship 2025",
      description: "Exciting moments from the world football championship.",
      thumbnail:
        "https://cdn-icons-png.flaticon.com/512/862/862627.png",
      category: "Sports",
    },
    {
      id: 103,
      title: "Stock Market Update",
      description: "Markets see significant rise in tech shares.",
      thumbnail:
        "https://cdn-icons-png.flaticon.com/512/1170/1170678.png",
      category: "Business",
    },
    {
      id: 104,
      title: "Healthy Living Tips",
      description: "10 daily habits for a healthier lifestyle.",
      thumbnail:
        "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
      category: "Health",
    },
    {
      id: 105,
      title: "Latest Gadgets 2025",
      description: "Check out the hottest gadgets released this year.",
      thumbnail:
        "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
      category: "Technology",
    },
  ]);

  // Function to change category
  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  // Filter articles based on active category
  const filteredArticles = allArticles.filter(
    (article) => article.category === activeCategory
  );

  return (
    <ScrollView
      style={styles.container}
      testID="scrollContainer"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header} testID="headerContainer">
        <Image
          source={require("../../assets/images/avatar.png")}
          style={styles.avatar}
        />
        <Text style={styles.greeting}>Hello, User!</Text>
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer} testID="titleContainer">
        <Text style={styles.title}>Stay updated with the latest news</Text>
        <Text style={styles.subtitle}>from around the world</Text>
      </View>

      {/* Categories */}
      <View testID="categoryList">
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>

      {/* Articles */}
      <View testID="articleList">
        <Articles articles={filteredArticles} categories={categories} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("3%"),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  avatar: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    marginRight: wp("3%"),
  },
  greeting: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    color: "#333",
  },
  titleContainer: {
    marginBottom: hp("2%"),
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: "#222",
  },
  subtitle: {
    fontSize: wp("4%"),
    color: "#666",
  },
});
