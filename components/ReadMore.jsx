import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const ReadMore = ({ data = "" }) => {
  const [showFullText, setShowFullText] = useState(false);

  const wordLimit = 30;
  const words = data?.split(" ") ?? [];
  const isLongText = words.length > wordLimit;
  const displayedText = showFullText
    ? data
    : words.slice(0, wordLimit).join(" ") + (isLongText ? "..." : "");

  return (
    <View>
      <Text className="text-gray text-md">{displayedText}</Text>
      {isLongText && (
        <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
          <Text className="text-primaryBlue font-semibold mt-2">
            {showFullText ? "Read Less" : "Read More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadMore;
