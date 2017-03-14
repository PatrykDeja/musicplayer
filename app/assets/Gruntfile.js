module.exports = function(grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);

    var jsFileList = [
        'js/musiclist.js',
        'js/main.js'
    ];
    // Project configuration.
    grunt.initConfig({
        sass: {
            default: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '../css/main.css': 'sass/main.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'opera 12']
            },
            default: {
                src: '../css/main.css'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [jsFileList],
                dest: '../js/scripts.js'
            }
        },
        watch: {
            sass: {
                files: [
                    'sass/*.scss',
                    'sass/**/*.scss'
                ],
                tasks: ['sass', 'autoprefixer']
            },
            js: {
                files: [
                    jsFileList
                ],
                tasks: ['concat']
            }
        },
        copy: {
            fontsAwesome: {
                expand: true,
                cwd: 'bower_components/components-font-awesome/fonts',
                src: '**',
                dest: '../fonts/'
            }
        }
    });
    
    // Default task(s).
    grunt.registerTask('default', ['sass', 'autoprefixer', 'concat', 'watch', 'copy']);
};