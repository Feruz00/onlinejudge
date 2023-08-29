#include<iostream>
using namespace std;
int main(){
	string s;
	getline(cin,s);
	string mx="";
	string s1="";
	s=s+" ";
	for(int i=0;i<s.length();i++){
		if(s[i]!=' ') s1+=s[i];
		else{
			if(mx.length()<s1.length()){
				mx = s1;
			}
			s1="";
		}
	}
	cout << mx;
	return 0;
}
