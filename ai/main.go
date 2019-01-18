package main

import "fmt"
import "os"
import "net/http"
import "encoding/json"

func main() {
	newGame()

}

func newGame() {
	var size int
	fmt.Println("Please Enter a Board Size")
	_, err := fmt.Scan(&size)
	if(err != nil) {
		fmt.Println("Scanning Error. Exiting Program")
		os.Exit(3)
	}
	fmt.Println("The size is", size)

	data := map[string]int{"size": size}
	marshalled, err := json.Marshal(data)
	if err != nil {
		os.Exit(1)
	}

	resp, err := http.Post("http://localhost:5000/new", string(marshalled), nil)
	if err != nil {
		fmt.Println("Game creation request failed")
		os.Exit(1)
	}
	fmt.Println(resp)
	move(size/2, size/2)

}


func move(x int, y int) {
	data := map[string]int{"x": x, "y": y}
	fmt.Println(data)
	marshalled, err := json.Marshal(data)
	fmt.Println(string(marshalled))
	if err != nil {
		os.Exit(1)
	}
	resp, err := http.Post("http://localhost:5000/click", string(marshalled), nil)
	fmt.Println(resp)
}
