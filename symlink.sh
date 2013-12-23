# Create the grunt-init dir
mkdir -p $HOME/.grunt-init/

# Link the current directory to ~/.grunt-init/sublime-plugin
ln -s $PWD $HOME/.grunt-init/sublime-plugin

# Notify the user
echo "Linked $PWD -> $HOME/.grunt-init/sublime-plugin"