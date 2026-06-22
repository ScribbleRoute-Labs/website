# Makefile for ScribbleRoute Labs Website
# Ensures Node.js and pnpm paths are configured correctly even if they are not in the system PATH.

# Detect OS and configure paths
ifeq ($(OS),Windows_NT)
    # Default installation paths on Windows
    NODE_PATH = C:\Program Files\nodejs
    PNPM_PATH = $(APPDATA)\npm
    
    # Export PATH so child shells can find node and global node modules
    export PATH := $(NODE_PATH);$(PNPM_PATH);$(PATH)
    
    PNPM = "$(PNPM_PATH)\pnpm.cmd"
else
    # Standard executable for Unix-like environments
    PNPM = pnpm
endif

.PHONY: all install dev build lint preview clean

all: install build

install:
	$(PNPM) install

dev:
	$(PNPM) dev

build:
	$(PNPM) build

lint:
	$(PNPM) lint

preview:
	$(PNPM) preview

clean:
ifeq ($(OS),Windows_NT)
	@if exist dist rmdir /s /q dist
	@if exist node_modules rmdir /s /q node_modules
else
	rm -rf dist node_modules
endif
