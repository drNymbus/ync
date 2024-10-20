for script in "$1/*.js"; do
    echo "$script"
    mongosh -f "$script"
done