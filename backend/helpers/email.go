package helpers

import (
	"net/mail"
	"strings"
)

func IsTechnischoolsEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	if err != nil {
		return false
	}
	return strings.HasSuffix(strings.ToLower(email), "@technischools.com")
}

