package main

import (
	_ "embed"
	"testing"
)

// //go:embed emails.txt
// var emailsFile string
//
// func isTechnischoolsEmail(email string) bool {
// 	allowed := strings.Split(emailsFile, "\n")
// 	for _, e := range allowed {
// 		if strings.TrimSpace(e) == strings.TrimSpace(email) {
// 			return true
// 		}
// 	}
// 	return false
// }

func TestIsTechnischoolsEmail(t *testing.T) {
	tests := []struct {
		name     string
		email    string
		expected bool
	}{
		{
			name:     "valid email from file",
			email:    "u84_marbud_waw@technischool.com",
			expected: true,
		},
		{
			name:     "another valid email from file",
			email:    "banana@technischools.com",
			expected: true,
		},
		{
			name:     "third valid email from file",
			email:    "lala@technischools.com",
			expected: true,
		},
		{
			name:     "email with spaces that matches",
			email:    "  lala@technischools.com  ",
			expected: true,
		},
		{
			name:     "non-existent email",
			email:    "nonexistent@technischools.com",
			expected: false,
		},
		{
			name:     "empty email",
			email:    "",
			expected: false,
		},
		{
			name:     "email with only spaces",
			email:    "   ",
			expected: false,
		},
		{
			name:     "similar but different domain",
			email:    "lala@technischool.org",
			expected: false,
		},
		{
			name:     "completely different email",
			email:    "test@gmail.com",
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := isTechnischoolsEmail(tt.email)
			if result != tt.expected {
				t.Errorf("isTechnischoolsEmail(%q) = %v, want %v", tt.email, result, tt.expected)
			}
		})
	}
}
