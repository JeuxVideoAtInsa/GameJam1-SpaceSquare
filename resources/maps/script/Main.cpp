#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <sstream>
#include <fstream>
#include "lib/tinyxml.h"


/**
 * TMX to JSON
 */

using namespace std;

int stringToInt(string chaine) {
    istringstream iss(chaine);
    int number;
    iss >> number; 
    return number;
}

int main (int argc, char* argv[])
{
	if (argc != 2) {
		cerr << "Please use a file as argument" << endl;
		return -1;
	}
	
	/*
	 * Format fileName
	 */
	string fileName = basename(argv[1]);
	size_t pos = fileName.find(".tmx");
	fileName = fileName.substr(0,pos);
	string numLevel(fileName);
	fileName = ("../json/"+fileName+".json");
	
	TiXmlDocument tmxFile(argv[1]);
	bool loadOkay = tmxFile.LoadFile();

	if (!loadOkay) {
		cerr << "Could not load input file" << endl;;
	}
	else {
		cout << "Loading complete" << endl;
		
		/*
		 * Creating file to save our xml level
		 */
		int width;
		int height;
		TiXmlDocument jsonFile;
		
		ofstream output(fileName.c_str(), ios::out | ios::trunc);
		output << "{";
		
		TiXmlHandle hdl(&tmxFile);
		TiXmlElement *sizeInfo = hdl.FirstChild("map").Element();
		if (!sizeInfo) {
			cerr << "Get level size error" << endl;
		}
		else {
			sizeInfo->QueryIntAttribute("width", &width);
			sizeInfo->QueryIntAttribute("height", &height);
			output << "\n";
			output << "\"width\": \"" << width << "\", \n";
			output << "\"height\": \"" << height << "\", \n";
		}
		
		TiXmlNode *data = hdl.FirstChild("map").FirstChild("layer").FirstChild("data").Element();
		if (!data) {
			cerr << "Get CSV data error" << endl;
		}
		else {
			
			int i = 0;
			int j = 0;
			string parsedNum;
			TiXmlNode *blocNode = data->FirstChild();
			
			vector<TiXmlElement*> items;
			
			output << "\"tiles\" : [\n" ;
			while (blocNode != 0) {
				parsedNum = blocNode->ToElement()->Attribute("gid");
				blocNode = blocNode->NextSibling();
				
				if (parsedNum != "0")  {
					// To JSON
					output << "    [" << i << ", " << j << ", " << parsedNum << "]";
					if (blocNode != 0) {
						output << ",";
					}
					output << "\n";
					
				}
				
				i++;
				if (i == width) {
					i = 0;
					j++;
				}
				
			}
			output << "]";
			output << "\n";
			output << "}";
			
		}
	
		cout << "Map converted to JSON !" << endl;
		
		output.close();
		
	}

	return 0;
}
